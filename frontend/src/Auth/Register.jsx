import toast from "react-hot-toast";
import {
   Form,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
   FormControl,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
   Card,
   CardAction,
   CardContent,
   CardDescription,
   CardFooter,
   CardHeader,
   CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { api } from "@/lib/api";

const loginSchema = z.object({
   name: z.string().min(3),
   email: z.string().email(),
   password: z.string().min(6),
});

// Login Component
const RegisterPage = ({ setCurrentPage }) => {
   const form = useForm({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         name: "",
         email: "",
         password: "",
      },
   });

   const onSubmit = async (data) => {
      handleRegister(data.email, data.password, data.name);
   };

   const handleRegister = async (email, password, name) => {
      api.post("/register", { email, password, name })
         .then((res) => {
            if (res.success) {
               toast.success("Registered successfully");
               setCurrentPage("login");
            }
         })
         .catch((err) => {
            console.error(err);
            toast.error(err.message || "Failed to register");
         });
   };

   return (
      <div className="flex gap-2 w-screen h-svh items-center justify-center">
         <Card className="w-full max-w-sm">
            <CardHeader>
               <CardTitle>Register your account</CardTitle>
               <CardDescription>
                  Enter your Details to create account
               </CardDescription>
               <CardAction>
                  <Button
                     variant="link"
                     className={"cursor-pointer"}
                     onClick={() => setCurrentPage("login")}
                  >
                     Login
                  </Button>
               </CardAction>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form className="space-y-4">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                 <Input placeholder="name" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                 <Input placeholder="email" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                     <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                 <Input placeholder="password" type="password" {...field} />
                              </FormControl>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </form>
               </Form>
            </CardContent>
            <CardFooter className="flex-col gap-2">
               <Button
                  type="submit"
                  className="w-full cursor-pointer"
                  onClick={form.handleSubmit(onSubmit)}
               >
                  Register
               </Button>
               <Button variant="outline" className="w-full cursor-pointer">
                  Register with Google
               </Button>
            </CardFooter>
         </Card>
      </div>
   );
};

export default RegisterPage;
