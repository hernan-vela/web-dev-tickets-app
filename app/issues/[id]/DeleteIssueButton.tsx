'use client';

import { EraserIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();

  return(
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red'>
        <EraserIcon />
        Delete Issue
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Content>
        <AlertDialog.Title>Confirm Delete</AlertDialog.Title>
      <AlertDialog.Description>
        Wait, wait, wait! If you delete this, it cannot be undone. Last word?
      </AlertDialog.Description>
      <Flex mt='5' gap='4'>
        <AlertDialog.Cancel>
          <Button variant='soft' color='gray'>Cancel</Button>
        </AlertDialog.Cancel>
        <AlertDialog.Action>
          <Button color='red' onClick={async () => {
            await axios.delete('/api/issues/' + issueId);
            router.push('/issues');
            router.refresh();
          }}>Delete Issue</Button>
        </AlertDialog.Action>
      </Flex>
      </AlertDialog.Content>
      
    </AlertDialog.Root>
  );

}

export default DeleteIssueButton;