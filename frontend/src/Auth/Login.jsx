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
import { useDispatch } from "react-redux";
import { login } from "@/store/userSlice/userSlice";
import GoogleLoginApp from "./GoogleLogin";

const loginSchema = z.object({
   email: z.string().email(),
   password: z.string().min(6),
});

// Login Component
const LoginPage = ({ setCurrentPage }) => {
   const dispatch = useDispatch();
   const form = useForm({
      resolver: zodResolver(loginSchema),
      defaultValues: {
         email: "",
         password: "",
      },
   });

   const onSubmit = async (data) => {
      handleLogin(data.email, data.password);
   };

   const handleLogin = async (email, password) => {
      api.post("/api/v1/auth/login", { email, password })
         .then((res) => {
            if (res.success) {
               dispatch(login(res.data));
               toast.success("Logged in successfully");
            }
         })
         .catch((err) => {
            console.log(err);
            toast.error(err.message || "Invalid email or password");
         });
   };

   return (
      <div className="flex gap-2 w-screen h-svh items-center justify-center">
         <Card className="w-full max-w-sm">
            <CardHeader>
               <CardTitle>Login to your account</CardTitle>
               <CardDescription>
                  Enter your email below to login to your account
               </CardDescription>
               <CardAction>
                  <Button
                     variant="link"
                     className={"cursor-pointer"}
                     onClick={() => setCurrentPage("register")}
                  >
                     Sign Up
                  </Button>
               </CardAction>
            </CardHeader>
            <CardContent>
               <Form {...form}>
                  <form className="space-y-4">
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
                                 <Input
                                    placeholder="password"
                                    type="password"
                                    {...field}
                                 />
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
                  Login
               </Button>
               <GoogleLoginApp/>
            </CardFooter>
         </Card>
      </div>
   );
};

export default LoginPage;
