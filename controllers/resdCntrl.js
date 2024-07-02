import asyncHandler from "express-async-handler";

import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;
  console.log(userEmail)
  console.log("Request data:", req.body.data);
  if (!userEmail) {
    console.log("email not found")
    return res.status(400).json({ message: "User email is required" });
  }
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "Residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with address already there");
    }
    console.log("error has been")
    throw new Error(err.message);
  }
});

// function to get all the documents/residencies
// export const getAllResidencies = asyncHandler(async (req, res) => {
//   const residencies = await prisma.residency.findMany({
//     orderBy: {
//       createdAt: "desc",
//     },
//   });
//   if (residencies.length === 0) {
//     return res.status(404).json({ message: "No residencies found" });
//   }

//   console.log("inside all property ")
//   res.send(residencies);
// });

export const getAllResidencies = asyncHandler(async (req, res) => {
  try {
    const residencies = await prisma.residency.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Check if residencies array is empty
    if (residencies.length === 0) {
      console.log("No residency inside")
      return res.status(404).json({ message: "No residencies found" });
    }
    // console.log("inside all property ");
    res.send(residencies);
  } catch (error) {
    console.error("Error fetching residencies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// function to get a specific document/residency
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});