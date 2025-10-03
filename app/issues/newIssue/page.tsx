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

/**  
 * This calls the validation schema without having
 * the interface in this file
*/
type IssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({resolver: zodResolver(createIssueSchema)});
  const [ error, setError ] = useState('');

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
        await axios.post('/api/issues', data);
        router.push('/issues'); 
      } catch (error) {
        setError('An unexpected error occurred.')
      }
    })}>
      <TextField.Root placeholder='Title' {...register('title')}/>
      {errors.title && <Text color='red' as='p' className='pb-3'>{errors.title.message}</Text> }
      <Controller 
      name="description"
      control={control}
      render={({ field }) => <SimpleMdeReact placeholder='Description' {...field} />}
      />
      {errors.description && <Text color='red' as='p' className='pb-3'>{errors.description.message}</Text> }
      <Button>Submit New Issue</Button>
    </form>
    </div>
  );
}

export default NewIssuePage;