import React, { useState, useMemo } from "react";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, getFilteredRowModel } from "@tanstack/react-table";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { ChevronDown, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import useGetHistory from '../../hooks/useGetHistory';
import useContext from '../../zustand/useContext';

const HistoryCard = () => {
    const [columnVisibility, setColumnVisibility] = useState({});
    const [globalFilter, setGlobalFilter] = useState("");

    const { setData, setNewData } = useContext();
    const { history } = useGetHistory();
    // console.log(history);

    const historyData = useMemo(() => {
        return (history || []).map(item => {
            const stats = item.stats || {};

            const riskText = Object.entries(stats)
                .filter(([key, count]) => count > 0 && key.endsWith("Count"))
                .map(([key, count]) => {
                    const label = key.replace("Count", "");
                    return `${label}: ${count}`;
                })
                .join(", ");

            return {
                _id: item._id,
                fileName: item.fileName,
                submitTime: new Date(item.createdAt).toLocaleString(),
                risks: riskText || "none",
            };
        });
    }, [history]);

    const columns = [
        {
            id: "index",
            header: "#",
            cell: ({ row }) => row.index + 1,
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "fileName",
            header: "File Name",
            cell: ({ row }) => <span>{row.getValue("fileName")}</span>,
        },
        {
            accessorKey: "submitTime",
            header: "Submit Time",
            cell: ({ row }) => {
                const time = row.getValue("submitTime")
                const date = new Date(time)
                return <span>{date.toLocaleString()}</span>
            },
        },
        {
            accessorKey: "risks",
            header: "Risk Count",
            cell: ({ row }) => <span>{row.getValue("risks")}</span>,
        },
        {
            id: "actions",
            header: "Operations",
            cell: ({ row }) => (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                        const rowId = row.original._id;
                        const fullData = history.find(item => item._id === rowId);
                        if (!fullData) return;

                        setData({
                            fileName: fullData.fileName,
                            documentText: fullData.documentText,
                            highlights: fullData.highlights,
                            stats: fullData.stats,
                        });

                        setNewData({
                            revised: fullData.revised,
                            changedParts: fullData.changedParts,
                        });
                    }}
                    className="hover:bg-[#33DB5B] hover:text-white font-semibold cursor-pointer"
                >
                    Detail
                </Button>
            ),
        },
    ];

    const table = useReactTable({
        data: historyData,
        columns,
        state: { globalFilter, columnVisibility },
        globalFilterFn: 'includesString',
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel()
    });

    return (
        <Card className="bg-white p-6 flex-1 flex flex-col gap-4">
            <div className="mt-[5px] flex items-center gap-4">
                <Input
                    placeholder="Filter files..."
                    value={globalFilter}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className="max-w-sm"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllLeafColumns()
                            .filter((column) => column.columnDef.enableHiding !== false)
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    checked={column.getIsVisible()}
                                    onCheckedChange={() => column.toggleVisibility()}
                                >
                                    {String(column.columnDef.header)}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="rounded-md border h-[400px] relative">
                <Table className="h-full">
                    <TableHeader className="h-[50px]">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-center font-bold">
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="text-center">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                                <TableRow>
                                    <TableCell colSpan={table.getAllColumns().length} className="p-0 h-0 border-none" />
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
                {table.getRowModel().rows.length === 0 && (
                    <div className="absolute top-[50px] bottom-0 left-0 right-0 flex items-center justify-center">
                        <h4 className="text-xl font-semibold tracking-tight">🔍 No matching results found</h4>
                    </div>
                )}
            </div>

            <div className="flex items-center justify-end gap-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </Card>
    )
}

export default HistoryCard