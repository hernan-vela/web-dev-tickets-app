import { issueSchema } from "@/lib/validationSchemas";
import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  request: NextRequest, 
  context: { params: Promise<{ id: string }> }  
) {

  // await params before using them. An update of Next.js 15
  const { id } = await context.params;

  const body = await request.json();
  const validation = issueSchema.safeParse(body);

  if (!validation.success) 
    return NextResponse.json(validation.error.issues, { status: 400 });

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id)}
  });
  if (!issue)
    return NextResponse.json({ error: 'Invalid issue. What are you doing?'});

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title: body.title,
      description: body.description
    }
  });

 return NextResponse.json(updatedIssue); 
}