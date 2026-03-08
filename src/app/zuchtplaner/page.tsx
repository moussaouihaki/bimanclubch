"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '@/i18n/I18nContext';

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
    const { t, language } = useI18n();

    const [sire, setSire] = useState<ParentState>({ color: 'seal', isChocCarrier: false, isDilCarrier: false, tabby: 'aa' });
    const [dam, setDam] = useState<ParentState>({ color: 'seal', isChocCarrier: false, isDilCarrier: false, tabby: 'aa', isTortie: false });
    const [results, setResults] = useState<any>(null);

    const formatColorName = (key: string) => {
        const base = key.replace('-tabby', '');
        const isTabby = key.includes('-tabby');
        let name = t(`color.${base.split('-')[0]}`);
        if (base.includes('tortie')) name = t(`color.${base.split('-')[0]}`) + " " + t('genetics.tortie');
        if (isTabby) name += " " + t('genetics.tabby');
        return name;
    };

    return (
        <main style={{ paddingTop: '150px', paddingBottom: '100px', minHeight: '100vh', background: 'var(--clr-bg)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>

                <h1 className="title-massive" style={{ textAlign: 'center', marginBottom: '4rem', fontSize: '3.5rem' }}>{t('genetics.title')}</h1>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>

                    {/* SIRE */}
                    <div style={{ background: 'white', padding: '3rem', borderRadius: '30px', boxShadow: 'var(--shadow-soft)' }}>
                        <h3 style={{ fontSize: '1.8rem', color: 'var(--clr-sapphire)', marginBottom: '2rem' }}>{t('genetics.sire')}</h3>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600 }}>{t('genetics.point_color')}</label>
                            <select value={sire.color} onChange={(e) => setSire({ ...sire, color: e.target.value as ColorId })} className="select-apple">
                                {['seal', 'blue', 'chocolate', 'lilac', 'red', 'cream'].map(c => <option key={c} value={c}>{t(`color.${c}`)}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                            <label className="checkbox-label"><input type="checkbox" checked={sire.isChocCarrier} onChange={e => setSire({ ...sire, isChocCarrier: e.target.checked })} /> {t('genetics.choc_carrier')}</label>
                            <label className="checkbox-label"><input type="checkbox" checked={sire.isDilCarrier} onChange={e => setSire({ ...sire, isDilCarrier: e.target.checked })} /> {t('genetics.dil_carrier')}</label>
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600 }}>{t('genetics.tabby_status')}</label>
                            <div style={{ display: 'grid', gap: '0.8rem' }}>
                                {(['aa', 'Aa', 'AA'] as TabbyStatus[]).map(status => (
                                    <label key={status} className="radio-label">
                                        <input type="radio" checked={sire.tabby === status} onChange={() => setSire({ ...sire, tabby: status })} />
                                        <span>{t(`genetics.tabby_${status}`)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* DAM */}
                    <div style={{ background: 'white', padding: '3rem', borderRadius: '30px', boxShadow: 'var(--shadow-soft)' }}>
                        <h3 style={{ fontSize: '1.8rem', color: 'var(--clr-sapphire)', marginBottom: '2rem' }}>{t('genetics.dam')}</h3>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600 }}>{t('genetics.point_color')}</label>
                            <select value={dam.color} onChange={(e) => setDam({ ...dam, color: e.target.value as ColorId })} className="select-apple">
                                {['seal', 'blue', 'chocolate', 'lilac', 'red', 'cream'].map(c => <option key={c} value={c}>{t(`color.${c}`)}</option>)}
                            </select>
                        </div>
                        <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
                            <label className="checkbox-label"><input type="checkbox" checked={dam.isChocCarrier} onChange={e => setDam({ ...dam, isChocCarrier: e.target.checked })} /> {t('genetics.choc_carrier')}</label>
                            <label className="checkbox-label"><input type="checkbox" checked={dam.isDilCarrier} onChange={e => setDam({ ...dam, isDilCarrier: e.target.checked })} /> {t('genetics.dil_carrier')}</label>
                            <label className="checkbox-label"><input type="checkbox" checked={dam.isTortie} onChange={e => setDam({ ...dam, isTortie: e.target.checked })} /> {t('genetics.tortie')}</label>
                        </div>
                        <div style={{ marginBottom: '2rem' }}>
                            <label style={{ display: 'block', marginBottom: '1rem', fontWeight: 600 }}>{t('genetics.tabby_status')}</label>
                            <div style={{ display: 'grid', gap: '0.8rem' }}>
                                {(['aa', 'Aa', 'AA'] as TabbyStatus[]).map(status => (
                                    <label key={status} className="radio-label">
                                        <input type="radio" checked={dam.tabby === status} onChange={() => setDam({ ...dam, tabby: status })} />
                                        <span>{t(`genetics.tabby_${status}`)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                    <button onClick={() => setResults(calculateGenetics(sire, dam))} className="btn-gold" style={{ padding: '1.2rem 5rem' }}>{t('genetics.calculate')}</button>
                </div>

                <AnimatePresence>
                    {results && (
                        <motion.section initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="card-apple" style={{ background: 'white', padding: '4rem' }}>
                            <h2 style={{ fontSize: '2.4rem', color: 'var(--clr-seal)', marginBottom: '4rem', textAlign: 'center' }}>{t('genetics.results')}</h2>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
                                {['males', 'females'].map(sex => (
                                    <div key={sex}>
                                        <h3 style={{ fontSize: '1.6rem', color: 'var(--clr-sapphire)', marginBottom: '2rem' }}>{t(`genetics.${sex}`)}</h3>
                                        <div style={{ display: 'grid', gap: '1.5rem' }}>
                                            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', paddingBottom: '1rem', borderBottom: '1px solid #eee', fontWeight: 700, fontSize: '0.8rem', color: 'var(--clr-gold)', textTransform: 'uppercase' }}>
                                                <span>{t('genetics.color')}</span>
                                                <span>{t('genetics.probability')}</span>
                                            </div>
                                            {results[sex].map((res: any) => (
                                                <div key={res.key} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', alignItems: 'center' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: COLORS_HEX[res.key.replace('-tabby', '')] || '#ccc' }} />
                                                        <span style={{ fontWeight: 500 }}>{formatColorName(res.key)}</span>
                                                    </div>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                        <div style={{ flexGrow: 1, height: '10px', background: 'rgba(0,51,153,0.05)', borderRadius: '5px', overflow: 'hidden' }}>
                                                            <div style={{ height: '100%', background: 'var(--clr-sapphire)', width: `${res.prob}%` }} />
                                                        </div>
                                                        <span style={{ fontWeight: 700, minWidth: '60px', textAlign: 'right' }}>{res.prob.toFixed(1)}%</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.section>
                    )}
                </AnimatePresence>
            </div>
            <style jsx>{`
                .select-apple { width: 100%; padding: 1rem; borderRadius: 12px; border: 1px solid #eee; background: #fafafa; font-size: 1rem; }
                .checkbox-label, .radio-label { display: flex; alignItems: center; gap: 1rem; cursor: pointer; font-size: 1rem; color: var(--clr-text-muted); }
                .checkbox-label:hover, .radio-label:hover { color: var(--clr-seal); }
            `}</style>
        </main>
    );
}
