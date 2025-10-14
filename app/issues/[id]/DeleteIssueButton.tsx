'use client';

import { Spinner } from "@/app/components";
import { EraserIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const deleteIssue = async () => {
    try {
      setDeleting(true);
      await axios.delete('/api/issues/' + issueId);
      router.push('/issues');
      router.refresh();
    } catch (error) {
      setDeleting(false);
      setError(true);
    }
  }

  return(
    <>
    <AlertDialog.Root>
      <AlertDialog.Trigger>
        <Button color='red' disabled={isDeleting}>
        <EraserIcon />
        Delete Issue
        {isDeleting && <Spinner />}
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
          <Button color='red' onClick={deleteIssue}>
            Delete Issue
          </Button>
        </AlertDialog.Action>
      </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
    <AlertDialog.Root open={error}>
      <AlertDialog.Content>
      <AlertDialog.Title>Error</AlertDialog.Title>
      <AlertDialog.Description>This issue could not be deleted</AlertDialog.Description>
      <Button variant='soft' color='gray' mt='3' onClick={() => setError(false)}>OK</Button>
      </AlertDialog.Content>
    </AlertDialog.Root>
    </>
  );

}

export default DeleteIssueButton;