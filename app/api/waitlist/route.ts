import { NewUser } from "@/emails/NewUser";
import { WelcomeEmail } from "@/emails/WelcomeEmail";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";

const emailSchema = z.object({
  email: z.string().email("Email inválido"),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validar email
    const validation = emailSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const { email } = validation.data;

    const { data, error } = await resend.batch.send([
      {
        from: "AddInvoicesAI <sales@news.addinvoicesia.com>",
        to: [email],
        subject: "Thank you for joining the AddInvoicesAI waitlist!",
        react: WelcomeEmail(),
      },

      {
        from: "AddInvoicesAI Website <sales@news.addinvoicesia.com>",
        to: ["addinvoicesia@gmail.com"],
        subject: "New client has joined the AddInvoicesAI waitlist",
        react: NewUser({ email }),
      },
    ]);

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    // Guardar en Airtable
    // Codificar el nombre de la tabla por si tiene espacios o caracteres especiales
    const tableName = encodeURIComponent(process.env.AIRTABLE_TABLE_NAME!);
    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${tableName}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Email: email,
          },
        }),
      }
    );

    if (!airtableResponse.ok) {
      const airtableError = await airtableResponse.json().catch(() => ({}));

      // Si el email ya existe, Airtable retorna 422
      if (airtableResponse.status === 422) {
        return NextResponse.json(
          { error: "Este email ya está registrado en la waitlist" },
          { status: 409 }
        );
      }

      console.error("Error de Airtable:", airtableError);
      return NextResponse.json(
        { error: "Error al guardar en la base de datos" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Email registrado exitosamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error en API waitlist:", error);
    return NextResponse.json(
      { error: "Error al procesar tu solicitud" },
      { status: 500 }
    );
  }
}
