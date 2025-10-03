'use client';

import { Button, Callout, Text, TextField } from '@radix-ui/themes';
import SimpleMdeReact from 'react-simplemde-editor';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/lib/validationSchemas';
import { z } from 'zod';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';

/**  
 * This calls the validation schema without having
 * the interface in this file
*/
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({resolver: zodResolver(createIssueSchema)});
  const [ error, setError ] = useState('');
  const [ isSubmitting, setSubmitting ] = useState(false);

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
    onSubmit={handleSubmit(async (data) => {
      try {
        setSubmitting(true);
        await axios.post('/api/issues', data);
        router.push('/issues'); 
      } catch (error) {
        setSubmitting(false);  
        setError('An unexpected error occurred.')
      }
    })}>
      <TextField.Root placeholder='Title' {...register('title')}/>
      <ErrorMessage>
      {errors.title?.message}
      </ErrorMessage>
      
      <Controller 
      name="description"
      control={control}
      render={({ field }) => <SimpleMdeReact placeholder='Description' {...field} />}
      />
      {errors.description && <Text color='red' as='p' className='pb-'>{errors.description.message}</Text> }
      {/* 'disable' the button avoids the user the submit 
      the same info twice. Specially helpful when 
      dealing with money */}
      <Button disabled={isSubmitting}>
        Submit New Issue{isSubmitting && <Spinner />}
      </Button>
    </form>
    </div>
  );
}

export default NewIssuePage;