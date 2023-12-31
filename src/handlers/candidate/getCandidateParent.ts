import prisma from "../../db";

export const getCandidateParent = async (req, res) => {
  const { id } = req.currentUser;
  let candidate = await prisma.parentInfo.findFirst({
    where: {
      candidateId: id,
    },
  });
  return res.json(candidate);
};
