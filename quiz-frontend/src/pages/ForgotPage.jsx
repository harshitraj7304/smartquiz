import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { motion } from "framer-motion";
function ForgotPage() {
  const [value, setValue] = useState("");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=""
    >
      <Card className="max-w-sm mx-auto mt-15">
        <CardHeader>
          <CardTitle className="text-center">
            We have sent OTP on your email id
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-2 justify-center">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>

            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <div className="text-center text-sm">
            {value === "" ? (
              <>Enter your one-time otp.</>
            ) : (
              <>You entered: {value}</>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-2">
          <Button className="cursor-pointer" variant="outline">
            Verify
          </Button>
          <Button className="cursor-pointer" variant="outline">
            Resend OTP
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

export default ForgotPage;
