"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';
import { Section } from '@/components/Section';
import { PageHeader } from '@/components/PageHeader';
import { BirmanCard } from '@/components/BirmanCard';

// --- TYPES & CONSTANTS ---
type ColorId = 'seal' | 'blue' | 'chocolate' | 'lilac' | 'red' | 'cream';
type TabbyStatus = 'aa' | 'Aa' | 'AA';

interface ParentState {
    color: ColorId;
    isChocCarrier: boolean;
    isDilCarrier: boolean;
    tabby: TabbyStatus;
    isTortie?: boolean;
}

interface ResultItem {
    key: string;
    prob: number;
}

const COLORS_HEX: Record<string, string> = {
    seal: "#4A3728",
    blue: "#A8B8CC",
    chocolate: "#8B5A2B",
    lilac: "#CDB5BA",
    red: "#E6A176",
    cream: "#F3DFB7",
    'seal-tortie': "linear-gradient(45deg, #4A3728 50%, #E6A176 50%)",
    'blue-tortie': "linear-gradient(45deg, #A8B8CC 50%, #F3DFB7 50%)",
    'choc-tortie': "linear-gradient(45deg, #8B5A2B 50%, #E6A176 50%)",
    'lilac-tortie': "linear-gradient(45deg, #CDB5BA 50%, #F3DFB7 50%)",
};

// --- GENETIC CALCULATION LOGIC ---
function calculateGenetics(sire: ParentState, dam: ParentState) {
    const getB = (p: ParentState) => (p.color === 'chocolate' || p.color === 'lilac' ? [0, 0] : (p.isChocCarrier ? [1, 0] : [1, 1]));
    const getD = (p: ParentState) => ((p.color === 'blue' || p.color === 'lilac' || p.color === 'cream') ? [0, 0] : (p.isDilCarrier ? [1, 0] : [1, 1]));
    const getA = (p: TabbyStatus) => (p === 'AA' ? [1, 1] : (p === 'Aa' ? [1, 0] : [0, 0]));
    const getOSire = () => (sire.color === 'red' || sire.color === 'cream' ? [1] : [0]);
    const getODam = () => (dam.isTortie ? [1, 0] : ((dam.color === 'red' || dam.color === 'cream') ? [1, 1] : [0, 0]));

    const sB = getB(sire); const dB = getB(dam);
    const sD = getD(sire); const dD = getD(dam);
    const sA = getA(sire.tabby); const dA = getA(dam.tabby);
    const sO = getOSire(); const dO = getODam();

    const maleResults: Record<string, number> = {};
    const femaleResults: Record<string, number> = {};

    for (const b1 of sB) for (const b2 of dB)
        for (const d1 of sD) for (const d2 of dD)
            for (const a1 of sA) for (const a2 of dA)
                for (const oDam of dO) {
                    const isB = (b1 + b2) > 0;
                    const isD = (d1 + d2) > 0;
                    const isTabby = (a1 + a2) > 0;
                    const isRed = oDam === 1;
                    let colorKey = "";
                    if (isRed) colorKey = isD ? "red" : "cream";
                    else { if (isB) colorKey = isD ? "seal" : "blue"; else colorKey = isD ? "chocolate" : "lilac"; }
                    const name = colorKey + (isTabby ? "-tabby" : "");
                    maleResults[name] = (maleResults[name] || 0) + 1;
                }

    for (const b1 of sB) for (const b2 of dB)
        for (const d1 of sD) for (const d2 of dD)
            for (const a1 of sA) for (const a2 of dA)
                for (const oSire of sO) for (const oDam of dO) {
                    const isB = (b1 + b2) > 0;
                    const isD = (d1 + d2) > 0;
                    const isTabby = (a1 + a2) > 0;
                    const reds = oSire + oDam;
                    let colorKey = "";
                    if (reds === 2) colorKey = isD ? "red" : "cream";
                    else if (reds === 1) { if (isB) colorKey = isD ? "seal-tortie" : "blue-tortie"; else colorKey = isD ? "choc-tortie" : "lilac-tortie"; }
                    else { if (isB) colorKey = isD ? "seal" : "blue"; else colorKey = isD ? "chocolate" : "lilac"; }
                    const name = colorKey + (isTabby ? "-tabby" : "");
                    femaleResults[name] = (femaleResults[name] || 0) + 1;
                }

    const normalize = (res: Record<string, number>) => {
        const total = Object.values(res).reduce((a, b) => a + b, 0);
        return Object.entries(res).map(([key, count]) => ({ key, prob: (count / total) * 100 })).sort((a, b) => b.prob - a.prob);
    };

    return { males: normalize(maleResults), females: normalize(femaleResults) };
}

export default function ZuchtplanerPage() {
    const { t } = useI18n();

    const [sire, setSire] = useState<ParentState>({ color: 'seal', isChocCarrier: false, isDilCarrier: false, tabby: 'aa' });
    const [dam, setDam] = useState<ParentState>({ color: 'seal', isChocCarrier: false, isDilCarrier: false, tabby: 'aa', isTortie: false });
    const [results, setResults] = useState<{ males: ResultItem[], females: ResultItem[] } | null>(null);

    const formatColorName = (key: string) => {
        const base = key.replace('-tabby', '');
        const isTabby = key.includes('-tabby');
        let name = t(`color.${base.split('-')[0]}`);
        if (base.includes('tortie')) name = t(`color.${base.split('-')[0]}`) + " " + t('genetics.tortie');
        if (isTabby) name += " " + t('genetics.tabby');
        return name;
    };

    return (
        <main className="mt-12">
            <Section>
                <PageHeader 
                    tag={t('genetics.tag') || "Génétique"}
                    title={t('genetics.title')}
                    subtitle="Simulez les portées futures en fonction de la génétique des parents."
                />

                <div className="genetics-grid mb-12">
                    {/* SIRE */}
                    <BirmanCard
                        tag="MÂLE (SIRE)"
                        title={t('genetics.sire')}
                        description={
                            <div className="flex flex-col gap-8 mt-4">
                                <div>
                                    <label className="section-tag mb-4" style={{ fontSize: '0.65rem' }}>{t('genetics.point_color')}</label>
                                    <select value={sire.color} onChange={(e) => setSire({ ...sire, color: e.target.value as ColorId })} className="select-apple">
                                        {['seal', 'blue', 'chocolate', 'lilac', 'red', 'cream'].map(c => <option key={c} value={c}>{t(`color.${c}`)}</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="checkbox-label"><input type="checkbox" checked={sire.isChocCarrier} onChange={e => setSire({ ...sire, isChocCarrier: e.target.checked })} /> {t('genetics.choc_carrier')}</label>
                                    <label className="checkbox-label"><input type="checkbox" checked={sire.isDilCarrier} onChange={e => setSire({ ...sire, isDilCarrier: e.target.checked })} /> {t('genetics.dil_carrier')}</label>
                                </div>
                                <div>
                                    <label className="section-tag mb-4" style={{ fontSize: '0.65rem' }}>{t('genetics.tabby_status')}</label>
                                    <div className="flex flex-col gap-2">
                                        {(['aa', 'Aa', 'AA'] as TabbyStatus[]).map(status => (
                                            <label key={status} className="radio-label">
                                                <input type="radio" checked={sire.tabby === status} onChange={() => setSire({ ...sire, tabby: status })} />
                                                <span>{t(`genetics.tabby_${status}`)}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }
                    />

                    {/* DAM */}
                    <BirmanCard
                        tag="FEMELLE (DAM)"
                        title={t('genetics.dam')}
                        description={
                            <div className="flex flex-col gap-8 mt-4">
                                <div>
                                    <label className="section-tag mb-4" style={{ fontSize: '0.65rem' }}>{t('genetics.point_color')}</label>
                                    <select value={dam.color} onChange={(e) => setDam({ ...dam, color: e.target.value as ColorId })} className="select-apple">
                                        {['seal', 'blue', 'chocolate', 'lilac', 'red', 'cream'].map(c => <option key={c} value={c}>{t(`color.${c}`)}</option>)}
                                    </select>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="checkbox-label"><input type="checkbox" checked={dam.isChocCarrier} onChange={e => setDam({ ...dam, isChocCarrier: e.target.checked })} /> {t('genetics.choc_carrier')}</label>
                                    <label className="checkbox-label"><input type="checkbox" checked={dam.isDilCarrier} onChange={e => setDam({ ...dam, isDilCarrier: e.target.checked })} /> {t('genetics.dil_carrier')}</label>
                                    <label className="checkbox-label"><input type="checkbox" checked={dam.isTortie} onChange={e => setDam({ ...dam, isTortie: e.target.checked })} /> {t('genetics.tortie')}</label>
                                </div>
                                <div>
                                    <label className="section-tag mb-4" style={{ fontSize: '0.65rem' }}>{t('genetics.tabby_status')}</label>
                                    <div className="flex flex-col gap-2">
                                        {(['aa', 'Aa', 'AA'] as TabbyStatus[]).map(status => (
                                            <label key={status} className="radio-label">
                                                <input type="radio" checked={dam.tabby === status} onChange={() => setDam({ ...dam, tabby: status })} />
                                                <span>{t(`genetics.tabby_${status}`)}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        }
                    />
                </div>

                <div className="text-center mb-12">
                    <button onClick={() => setResults(calculateGenetics(sire, dam))} className="btn-gold" style={{ padding: '1.2rem 5rem' }}>{t('genetics.calculate')}</button>
                </div>

                <AnimatePresence>
                    {results && (
                        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="results-container">
                            <BirmanCard
                                variant="glass"
                                title={t('genetics.results')}
                                className="w-full"
                                description={
                                    <div className="results-grid mt-8">
                                        {['males', 'females'].map(sex => (
                                            <div key={sex} className="sex-results">
                                                <h3 className="mb-8" style={{ fontSize: '1.6rem', color: 'var(--clr-sapphire)' }}>{t(`genetics.${sex}`)}</h3>
                                                <div className="flex flex-col gap-4">
                                                    <div className="results-header">
                                                        <span>{t('genetics.color')}</span>
                                                        <span className="text-right">{t('genetics.probability')}</span>
                                                    </div>
                                                    {results[sex as 'males' | 'females'].map((res) => (
                                                        <div key={res.key} className="result-row">
                                                            <div className="flex items-center gap-4">
                                                                <div className="color-dot" style={{ background: COLORS_HEX[res.key.replace('-tabby', '')] || '#ccc' }} />
                                                                <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{formatColorName(res.key)}</span>
                                                            </div>
                                                            <div className="flex items-center gap-4">
                                                                <div className="prob-bar-bg">
                                                                    <div className="prob-bar-fill" style={{ width: `${res.prob}%` }} />
                                                                </div>
                                                                <span style={{ fontWeight: 800, minWidth: '60px', textAlign: 'right', color: 'var(--clr-blue-deep)' }}>{res.prob.toFixed(1)}%</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                }
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </Section>

            <style jsx>{`
                .genetics-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 4rem; }
                .results-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 6rem; }
                .select-apple { width: 100%; padding: 1rem; border-radius: 12px; border: 1px solid rgba(0,0,0,0.05); background: #fbfbfb; font-size: 1rem; font-weight: 500; outline: none; transition: 0.3s; }
                .select-apple:focus { border-color: var(--clr-blue-vibrant); background: white; }
                .checkbox-label, .radio-label { display: flex; alignItems: center; gap: 1rem; cursor: pointer; font-size: 1rem; color: var(--clr-text-muted); font-weight: 500; }
                .checkbox-label input, .radio-label input { width: 20px; height: 20px; accent-color: var(--clr-blue-vibrant); }
                .results-header { display: grid; grid-template-columns: 1.5fr 1fr; padding-bottom: 0.5rem; border-bottom: 2px solid rgba(0,0,0,0.05); font-weight: 700; font-size: 0.75rem; color: var(--clr-gold-real); text-transform: uppercase; letter-spacing: 0.1em; }
                .result-row { display: grid; grid-template-columns: 1.5fr 1fr; align-items: center; border-bottom: 1px solid rgba(0,0,0,0.03); padding: 0.8rem 0; }
                .color-dot { width: 14px; height: 14px; border-radius: 50%; box-shadow: 0 0 0 2px white, 0 0 0 3px rgba(0,0,0,0.05); }
                .prob-bar-bg { flex-grow: 1; height: 8px; background: rgba(0,0,0,0.04); border-radius: 100px; overflow: hidden; }
                .prob-bar-fill { height: 100%; background: linear-gradient(90deg, var(--clr-sapphire), var(--clr-blue-vibrant)); border-radius: 100px; }

                @media (max-width: 1024px) {
                    .genetics-grid { grid-template-columns: 1fr; gap: 2rem; }
                    .results-grid { grid-template-columns: 1fr; gap: 4rem; }
                }
            `}</style>
        </main>
    );
}

