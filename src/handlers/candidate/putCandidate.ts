import { Prisma } from "@prisma/client";
import prisma from "../../db";
import { CannotProcessError } from "../../errors/cannot-process-error";
import { BadRequestError } from "../../errors/bad-request-error";

export const putCandidate = async (req, res) => {
  const { id } = req.currentUser;
  const data = { ...req.body };
  if (data.dob) {
    const dobstr = new Date(data.dob);
    data.dob = new Date(data.dob);
  }

  if (data.aadhaarverified === "") {
    delete data.aadhaarverified;
  }
  console.log(data);
  //   if (data.aadhaarnumber === "") {
  //     delete data.aadhaarnumber;
  //   }
  try {
    const candidate = await prisma.candidate.update({
      where: {
        id,
      },
      data,
    });
    return res.json(candidate);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        throw new CannotProcessError(
          "Email, Phone or Aadhaar already exists",
          "server"
        );
      } else if (error.code === "P2003") {
        throw new CannotProcessError("Required input is missing");
      } else {
        throw new BadRequestError("Cannot process the request");
      }
    } else {
      throw new BadRequestError("Cannot process the request");
    }
  }
};
