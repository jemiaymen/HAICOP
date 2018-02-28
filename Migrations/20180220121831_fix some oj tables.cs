using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class fixsomeojtables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invite_GuestInAcheteur_GueInAchID",
                table: "Invite");

            migrationBuilder.DropForeignKey(
                name: "FK_Member_Commission_CommissionID",
                table: "Member");

            migrationBuilder.DropForeignKey(
                name: "FK_OJ_Commission_CommissionID",
                table: "OJ");

            migrationBuilder.RenameIndex(
                name: "IX_Invite_GueInAchID",
                table: "Invite",
                newName: "IX_Invite_GuestID");

            migrationBuilder.RenameColumn(
                name: "GueInAchID",
                table: "Invite",
                newName: "GuestID");

            migrationBuilder.DropIndex(
                name: "IX_OJ_CommissionID",
                table: "OJ");

            migrationBuilder.DropIndex(
                name: "IX_Member_CommissionID",
                table: "Member");

            migrationBuilder.DropTable(
                name: "GuestInAcheteur");

            migrationBuilder.AddColumn<int>(
                name: "AcheteurID",
                table: "Guest",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Guest_AcheteurID",
                table: "Guest",
                column: "AcheteurID");

            migrationBuilder.AddForeignKey(
                name: "FK_Guest_Acheteur_AcheteurID",
                table: "Guest",
                column: "AcheteurID",
                principalTable: "Acheteur",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Invite_Guest_GuestID",
                table: "Invite",
                column: "GuestID",
                principalTable: "Guest",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Guest_Acheteur_AcheteurID",
                table: "Guest");

            migrationBuilder.DropForeignKey(
                name: "FK_Invite_Guest_GuestID",
                table: "Invite");

            migrationBuilder.RenameIndex(
                name: "IX_Invite_GuestID",
                table: "Invite",
                newName: "IX_Invite_GueInAchID");

            migrationBuilder.RenameColumn(
                name: "GuestID",
                table: "Invite",
                newName: "GueInAchID");

            migrationBuilder.DropIndex(
                name: "IX_Guest_AcheteurID",
                table: "Guest");

            migrationBuilder.DropColumn(
                name: "AcheteurID",
                table: "Guest");

            migrationBuilder.CreateTable(
                name: "GuestInAcheteur",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    AcheteurID = table.Column<int>(nullable: false),
                    GuestID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuestInAcheteur", x => x.ID);
                    table.ForeignKey(
                        name: "FK_GuestInAcheteur_Acheteur_AcheteurID",
                        column: x => x.AcheteurID,
                        principalTable: "Acheteur",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_GuestInAcheteur_Guest_GuestID",
                        column: x => x.GuestID,
                        principalTable: "Guest",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OJ_CommissionID",
                table: "OJ",
                column: "CommissionID");

            migrationBuilder.CreateIndex(
                name: "IX_Member_CommissionID",
                table: "Member",
                column: "CommissionID");

            migrationBuilder.CreateIndex(
                name: "IX_GuestInAcheteur_AcheteurID",
                table: "GuestInAcheteur",
                column: "AcheteurID");

            migrationBuilder.CreateIndex(
                name: "IX_GuestInAcheteur_GuestID",
                table: "GuestInAcheteur",
                column: "GuestID");

            migrationBuilder.AddForeignKey(
                name: "FK_Invite_GuestInAcheteur_GueInAchID",
                table: "Invite",
                column: "GueInAchID",
                principalTable: "GuestInAcheteur",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Member_Commission_CommissionID",
                table: "Member",
                column: "CommissionID",
                principalTable: "Commission",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OJ_Commission_CommissionID",
                table: "OJ",
                column: "CommissionID",
                principalTable: "Commission",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
