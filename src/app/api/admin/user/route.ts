import dbConnect from "@/config/dbConnect";
import UserModel from "@/models/UserModel";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const { id } = await request.json();

    const user = await UserModel.findById(id);

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

    return Response.json(
      {
        success: true,
        message: "User fetched successfully",
        user,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(error);
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
