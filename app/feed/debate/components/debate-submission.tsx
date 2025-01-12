'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { submitProposal } from '@/lib/firebase/posts'
import { useAuth } from '@/app/context/AuthContext'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

const proposalSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(100, 'Title must not exceed 100 characters'),
  content: z.string().min(50, 'Content must be at least 50 characters').max(1000, 'Content must not exceed 1000 characters'),
})

type ProposalFormValues = z.infer<typeof proposalSchema>

export function DebateSubmissionForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { user, username } = useAuth()

  const form = useForm<ProposalFormValues>({
    resolver: zodResolver(proposalSchema),
    defaultValues: {
      title: '',
      content: '',
    },
  })

  async function onSubmit(data: ProposalFormValues) {
    if (!user) {
      toast.error('You must be logged in to submit a debate')
      return
    }

    setIsSubmitting(true)
    try {
      const result = await submitProposal(data, user, username)

      if (result.success) {
        toast.success('Debate submitted successfully')
        form.reset()
      } else {
        toast.error(result.error || 'Failed to submit debate')
      }
    } catch (error) {
      console.error("Error submitting debate:", error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Submit a New Debate</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Debate Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the title of your debate" {...field} />
                  </FormControl>
                  <FormDescription>
                    Provide a clear and concise title for your debate.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Debate Content</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your proposal in detail" 
                      className="min-h-[200px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Explain your debate, its benefits, and any implementation details.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Proposal"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}