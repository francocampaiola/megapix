import { createClient } from '@/utils/supabase/client'
import { NextResponse } from 'next/server'

export async function POST(req) {
    const client = createClient();

    const { nombre_apellido, fecha_nacimiento, genero, telefono, dni_numero, dni_img_frente, dni_img_dorso } = req.body;

    const { data, error } = await client.from('usuarios').insert([
        { nombre_apellido, fecha_nacimiento, genero, telefono, dni_numero, dni_img_frente, dni_img_dorso }
    ]);

    if (error) {
        return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ data });
}