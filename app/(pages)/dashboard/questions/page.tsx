"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import MaxWidthWrapper from "@/app/_components/MaxWidthWrapper";
import { SidebarOpenContext } from "@/app/context/sidebarOpenContext";
import { cn } from "@/lib/utils";
import { useContext } from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

interface QuestionsPageProps {}

const QuestionsPage: React.FC<QuestionsPageProps> = ({}) => {
  const { isSidebarOpen } = useContext(SidebarOpenContext);

  const createQuestion = async () => {
    try {
      let values = {};
      const { data } = await axios.post(`/api/questions`, values);
      toast.success("Question updated successfully");
      window.location.assign(`/dashboard/questions/${data.id}`);
    } catch (error) {
      console.log(error);

      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <MaxWidthWrapper className="">
        <main
          className={cn("flex box-border p-6", {
            "md:ml-[300px]": isSidebarOpen,
            "ml-0": !isSidebarOpen,
          })}>
          {/* ques cat table and create button section*/}
          <section className="flex w-full">
            <div className="flex-1 pr-6">
              <h3>Category metrics</h3>
              <Table>
                <TableCaption>A list of your recent invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            <button
              onClick={createQuestion}
              className={cn(
                buttonVariants({
                  size: "lg",
                  variant: "ghost",
                }),
                "bg-slate-50 flex-shrink"
              )}>
              Create Question
            </button>
          </section>

          {/* all quetions table section*/}
          <section></section>
        </main>
      </MaxWidthWrapper>
    </>
  );
};
export default QuestionsPage;
