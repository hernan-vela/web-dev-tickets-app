import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { prisma } from '@/prisma/client';
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes';
import delay from 'delay';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { Pencil1Icon } from "@radix-ui/react-icons"
import Link from 'next/link';

interface Props {
  params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) }
  });

   if(!issue)
      notFound();
   // Delay to see the skeletons in dev mode. It can be removed in production
   await delay(2000);

  return (
    <Grid columns={{ initial: "1", md: "2" }} gap='5'>
      <Box>
  <Heading>{issue.title}</Heading>
    <Flex className='gap-3 items-center' my='2'>
      <IssueStatusBadge status={issue.status}/>
      <Text>{issue.createdAt.toDateString()}</Text>
    </Flex>
    <Card>
  <ReactMarkdown>{issue.description}</ReactMarkdown>
    </Card>
    </Box>
    <Box>
    <Button>
      <Pencil1Icon />
      <Link href={`/${issue.id}/edit`}>
      Edit Issue
      </Link>
      
      </Button>
    </Box>
    </Grid>
  );
}

export default IssueDetailsPage;