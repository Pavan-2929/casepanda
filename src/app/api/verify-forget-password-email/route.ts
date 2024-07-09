import UserModel from "@/models/UserModel";
import dbConnect from "@/config/dbConnect";
import forgetPasswordMailer from "@/emails/forgetPassword-mail";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { email } = await request.json();

    const user = await UserModel.findOne({ email });
    console.log(email);

    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const expiry = new Date(Date.now() + 600000);

    user.forgetPasswordExpiry = expiry;
    await user.save();

    console.log(user);

    await forgetPasswordMailer({ email, username: email.username });

    return Response.json(
      {
        success: true,
        message: "Reset password link has been sent to your email",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in sending forget password mail", error);
    return Response.json(
      {
        success: false,
        message: "An error occurred",
      },
      {
        status: 500,
      }
    );
  }
}
