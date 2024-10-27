'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
    FormDescription
} from "@/components/ui/form"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns";
import { cn } from "@/lib/utils"
import { useToast } from '@/hooks/use-toast'


export const productSchema = z.object({
    email: z.string().email("Invalid email address"),
    productName: z.string().min(3, "Product name should be at least 3 characters"),
    skuid: z.string().min(5, "SKU ID should be greater than 5 characters"),
    brandName: z.string().min(1, "Brand name is required"),
    warranty: z.string(),
    type: z.string(),
    purchasedate: z.date()
})

type ProductFormValues = z.infer<typeof productSchema>;

const FormData = () => {
    const { toast } = useToast()
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            email: "",
            productName: "",
            skuid: "",
            brandName: "",
            warranty: "",
            type: "",
            purchasedate: undefined
        }
    })

    const onSubmit = async (values: ProductFormValues) => {
        try {
            const response = await fetch("/api/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values)
            })
            if (!response.ok) throw new Error("Failed to save product");
            const result = await response.json();
            toast({ description: "Your product was registered", })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
            })
            console.error("Error saving product:", error);
        }
    };

    return (
        <div className='my-10 flex justify-center items-center'>
            <Card className="">
                <CardHeader>
                    <CardTitle>Register your product</CardTitle>
                    <CardDescription>Register your product for warranty in a few steps.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid w-full items-center gap-4">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Your email address" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="productName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Product Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name of your product" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="skuid"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>SKU ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="SKU ID of your product" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="brandName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Brand Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Name of the brand" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="type"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Type</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select category" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Electronics">Electronics</SelectItem>
                                                    <SelectItem value="Apparel">Apparel</SelectItem>
                                                    <SelectItem value="Health & Wellness">Health & Wellness</SelectItem>
                                                    <SelectItem value="Home Accessories">Home Accessories</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="warranty"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Warranty</FormLabel>
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger>
                                                        <SelectValue placeholder="Select warranty period" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="3 months">3 months</SelectItem>
                                                    <SelectItem value="6 months">6 months</SelectItem>
                                                    <SelectItem value="1 year">1 year</SelectItem>
                                                    <SelectItem value="2 years">2 years</SelectItem>
                                                    <SelectItem value="3 years">3 years</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="purchasedate"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Purchase Date</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-[240px] pl-3 text-left font-normal",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(field.value, "EEE MMM dd yyyy")
                                                            ) : (
                                                                <span>Pick a date</span>
                                                            )}
                                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={field.value}
                                                        onSelect={field.onChange}
                                                        disabled={(date) =>
                                                            date > new Date()
                                                        }
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormDescription>
                                                Select the date when the product was purchased.
                                            </FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <Button type="submit" className="mt-4 font-semibold text-white">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}

export default FormData
