'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { Issue } from '@/generated/prisma/client';
import { issueSchema } from '@/lib/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RiAlarmWarningLine } from 'react-icons/ri';
import SimpleMdeReact from 'react-simplemde-editor';
import { z } from 'zod';

/**  
 * This calls the validation schema without having
 * the interface in this file
*/
type IssueFormData = z.infer<typeof issueSchema>;

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter();
  const { 
    register, 
    control, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<IssueFormData>({resolver: zodResolver(issueSchema)});
  const [ error, setError ] = useState('');
  const [ isSubmitting, setSubmitting ] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (issue)
        await axios.patch('/api/issues/' + issue.id, data);
      else
        await axios.post('/api/issues', data);
      router.push('/issues/list'); 
      router.refresh();
      // here between it was: } catch (error) {
    } catch {
      setSubmitting(false);  
      setError('An unexpected error occurred.')
      }
    });

  return(
    <div className='max-w-xl'>
      {error && <Callout.Root color='red' className='mb-5'>
        <Callout.Icon>
          <RiAlarmWarningLine />
        </Callout.Icon>
        <Callout.Text>{error}</Callout.Text>
        </Callout.Root>}
    <form 
    className='space-y-5' 
    onSubmit={onSubmit}
    >
      <TextField.Root defaultValue={issue?.title} placeholder='Title' {...register('title')}/>
      <ErrorMessage>
      {errors.title?.message}
      </ErrorMessage>
      
      <Controller 
      name="description"
      control={control}
      defaultValue={issue?.description}
      render={({ field }) => <SimpleMdeReact placeholder='Description' {...field} />}
      />
      {errors.description && <Text color='red' as='p' className='pb-'>{errors.description.message}</Text> }
      {/* 'disable' the button avoids the user the submit 
      the same info twice. Specially helpful when 
      dealing with money */}
      <Button disabled={isSubmitting}>
        {/* The blank space below {' '} adds a space on the button, between the label and the spinner*/}
        { issue ? 'Update Issue' : 'Submit New Issue'}{' '}{isSubmitting && <Spinner />}
      </Button>
    </form>
    </div>
  );
}

export default IssueForm;