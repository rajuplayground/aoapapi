import { Prisma } from "@prisma/client";
import prisma from "../../db";
import { BadRequestError } from "../../errors/bad-request-error";
import { CannotProcessError } from "../../errors/cannot-process-error";

export const getTransactionsByApplication = async (req, res) => {
  const examapplicationId = req.params.id;

  if (!examapplicationId) {
    throw new BadRequestError("Input is invalid");
  }

  const entrancePayments = await prisma.entrancePayments.findMany({
    where: {
      examapplicationId,
    },
    orderBy: {
      createdAt: "desc", // Sort by createdAt in descending order (latest to oldest)
    },
  });

  return res.json(entrancePayments);
};

export const createEntranceTransaction = async (req, res) => {
  const { candidateId, examapplicationId, description, amount } = req.body;
  try {
    const newTransaction = await prisma.entrancePayments.create({
      data: {
        candidateId,
        examapplicationId,
        description,
        amount,
      },
    });
    return res.json(newTransaction);
  } catch (error) {
    console.log(error);
    throw new BadRequestError("Transaction cannot be created");
  }
};
