import dbConnect from "@/config/dbConnect";
import bcryptjs from "bcryptjs";
import UserModel from "@/models/UserModel";
import verifyCodeMailer from "@/emails/verifyCode-mail";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password } = await request.json();

    const isUserVerified = await UserModel.findOne({
      email,
      isVerified: true,
    });

    if (isUserVerified) {
      return Response.json(
        { success: false, message: "User is already verified, Please Login" },
        { status: 401 }
      );
    }

    const user = await UserModel.findOne({ email });
    const hashedPassword = await bcryptjs.hash(password, 10);
    const verifyCode = Math.floor(1000 + Math.random() * 9000).toString();
    const verifyCodeExpiry = new Date(Date.now() + 600000);

    if (user) {
      if (user.isVerified) {
        return Response.json(
          {
            success: false,
            message: "User is already verified, Please Login",
          },
          { status: 401 }
        );
      } else {
        user.username = username;
        user.verifyCode = verifyCode;
        user.verifyCodeExpiry = verifyCodeExpiry;
        user.isVerified = true;

        await user.save();
      }
    } else {
      const newUser = new UserModel({
        username,
        email,
        password: hashedPassword,
        verifyCode,
        verifyCodeExpiry,
        isVerified: false,
      });

      await newUser.save();
    }

    await verifyCodeMailer({ username, email, verifyCode });

    return Response.json(
      {
        success: true,
        message:
          "User registered successfully. Verification code sent to your email",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("error in sending verification mail", error);
    return Response.json(
      { success: false, message: "An error occurred" },
      { status: 500 }
    );
  }
}
