using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class createnextnum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NextNum",
                columns: table => new
                {
                    CommissionID = table.Column<int>(nullable: false),
                    Next = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NextNum", x => x.CommissionID);
                    table.ForeignKey(
                        name: "FK_NextNum_Commission_CommissionID",
                        column: x => x.CommissionID,
                        principalTable: "Commission",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NextNum");
        }
    }
}
