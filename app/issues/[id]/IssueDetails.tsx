import { IssueStatusBadge } from '@/app/components'
import { Issue } from '@/generated/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

const IssueDetails = ({ issue }: { issue: Issue}) => {
  return (
    <>
    <Heading>{issue.title}</Heading>
    <Flex className='gap-3 items-center' my='2'>
      <IssueStatusBadge status={issue.status}/>
      <Text>{issue.createdAt.toDateString()}</Text>
    </Flex>
    <Card>
  <ReactMarkdown>{issue.description}</ReactMarkdown>
    </Card>
    </>
  )
}

export default IssueDetails;