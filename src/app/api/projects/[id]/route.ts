import { getServerAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerAuthSession();

  if (!session || !session.user)
    return NextResponse.json(
      {
        message: "Unauthorized",
      },
      {
        status: 401,
      }
    );
  const { id } = params;

  const body = await request.json();

  try {
    const { technologies, ...restBody } = body;
    const projectUpdated = await prisma.project.update({
      where: {
        id,
      },

      data: {
        ...restBody,
        technologies: {
          deleteMany: {},
          create: technologies.map((technologyId: number) => {
            return {
              technologyId,
            };
          }),
        },
      },
    });

    return NextResponse.json(
      {
        message: "Operation successful",
        data: projectUpdated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Operation failed", error },
      { status: 500 }
    );
  }
}
