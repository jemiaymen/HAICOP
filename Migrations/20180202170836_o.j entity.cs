using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class ojentity : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Document",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Date = table.Column<DateTime>(nullable: false),
                    DossierID = table.Column<int>(nullable: false),
                    Nature = table.Column<int>(nullable: false),
                    RealPath = table.Column<string>(maxLength: 500, nullable: false),
                    Url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Document", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Document_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Encour",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    AccordCadre = table.Column<int>(nullable: false),
                    Avenant = table.Column<int>(nullable: false),
                    CommissionID = table.Column<int>(nullable: false),
                    Consultation = table.Column<int>(nullable: false),
                    Debat = table.Column<int>(nullable: false),
                    Final = table.Column<int>(nullable: false),
                    Fouillement = table.Column<int>(nullable: false),
                    NegociationDirect = table.Column<int>(nullable: false),
                    RapportFinanceTechnique = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Encour", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Encour_Commission_CommissionID",
                        column: x => x.CommissionID,
                        principalTable: "Commission",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Guest",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Desc = table.Column<string>(maxLength: 500, nullable: true),
                    Email = table.Column<string>(nullable: false),
                    FirstLastName = table.Column<string>(maxLength: 20, nullable: false),
                    Fix = table.Column<string>(nullable: true),
                    Tel = table.Column<string>(nullable: true),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Guest", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "OJ",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    CommissionID = table.Column<int>(nullable: false),
                    Num = table.Column<int>(nullable: false),
                    Year = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OJ", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OJ_Commission_CommissionID",
                        column: x => x.CommissionID,
                        principalTable: "Commission",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

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

            migrationBuilder.CreateTable(
                name: "Member",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    CommissionID = table.Column<int>(nullable: false),
                    GuestID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Member", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Member_Commission_CommissionID",
                        column: x => x.CommissionID,
                        principalTable: "Commission",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Member_Guest_GuestID",
                        column: x => x.GuestID,
                        principalTable: "Guest",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DocInOJ",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    DossierID = table.Column<int>(nullable: false),
                    OJID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DocInOJ", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DocInOJ_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DocInOJ_OJ_OJID",
                        column: x => x.OJID,
                        principalTable: "OJ",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Invite",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    GueInAchID = table.Column<int>(nullable: false),
                    OJID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invite", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Invite_GuestInAcheteur_GueInAchID",
                        column: x => x.GueInAchID,
                        principalTable: "GuestInAcheteur",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Invite_OJ_OJID",
                        column: x => x.OJID,
                        principalTable: "OJ",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.AddColumn<int>(
                name: "Mode",
                table: "Dossier",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_DocInOJ_DossierID",
                table: "DocInOJ",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "IX_DocInOJ_OJID",
                table: "DocInOJ",
                column: "OJID");

            migrationBuilder.CreateIndex(
                name: "IX_Document_DossierID",
                table: "Document",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "IX_Encour_CommissionID",
                table: "Encour",
                column: "CommissionID");

            migrationBuilder.CreateIndex(
                name: "IX_GuestInAcheteur_AcheteurID",
                table: "GuestInAcheteur",
                column: "AcheteurID");

            migrationBuilder.CreateIndex(
                name: "IX_GuestInAcheteur_GuestID",
                table: "GuestInAcheteur",
                column: "GuestID");

            migrationBuilder.CreateIndex(
                name: "IX_Invite_GueInAchID",
                table: "Invite",
                column: "GueInAchID");

            migrationBuilder.CreateIndex(
                name: "IX_Invite_OJID",
                table: "Invite",
                column: "OJID");

            migrationBuilder.CreateIndex(
                name: "IX_Member_CommissionID",
                table: "Member",
                column: "CommissionID");

            migrationBuilder.CreateIndex(
                name: "IX_Member_GuestID",
                table: "Member",
                column: "GuestID");

            migrationBuilder.CreateIndex(
                name: "IX_OJ_CommissionID",
                table: "OJ",
                column: "CommissionID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mode",
                table: "Dossier");

            migrationBuilder.DropTable(
                name: "DocInOJ");

            migrationBuilder.DropTable(
                name: "Document");

            migrationBuilder.DropTable(
                name: "Encour");

            migrationBuilder.DropTable(
                name: "Invite");

            migrationBuilder.DropTable(
                name: "Member");

            migrationBuilder.DropTable(
                name: "GuestInAcheteur");

            migrationBuilder.DropTable(
                name: "OJ");

            migrationBuilder.DropTable(
                name: "Guest");
        }
    }
}
