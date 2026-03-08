import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'submissions.json');

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // Read existing
        let submissions = [];
        if (fs.existsSync(DB_PATH)) {
            const fileData = fs.readFileSync(DB_PATH, 'utf-8');
            submissions = JSON.parse(fileData);
        }

        // Create new entry
        const newSubmission = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            type: data.type || 'unknown',
            status: 'pending', // pending, approved, rejected
            payload: data.payload || {}
        };

        submissions.push(newSubmission);

        // Write back
        fs.writeFileSync(DB_PATH, JSON.stringify(submissions, null, 2));

        return NextResponse.json({ success: true, submissionId: newSubmission.id });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        if (fs.existsSync(DB_PATH)) {
            const fileData = fs.readFileSync(DB_PATH, 'utf-8');
            return NextResponse.json(JSON.parse(fileData));
        }
        return NextResponse.json([]);
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}
