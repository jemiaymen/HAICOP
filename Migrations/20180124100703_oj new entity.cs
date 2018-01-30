using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class ojnewentity : Migration
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
                name: "GuestInAcheteur",
                columns: table => new
                {
                    AcheteurID = table.Column<int>(nullable: false),
                    GuestID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GuestInAcheteur", x => new { x.AcheteurID, x.GuestID });
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
                    CommissionID = table.Column<int>(nullable: false),
                    GuestID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Member", x => new { x.CommissionID, x.GuestID });
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

            migrationBuilder.AddColumn<int>(
                name: "Mode",
                table: "Dossier",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Document_DossierID",
                table: "Document",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "IX_Encour_CommissionID",
                table: "Encour",
                column: "CommissionID");

            migrationBuilder.CreateIndex(
                name: "IX_GuestInAcheteur_GuestID",
                table: "GuestInAcheteur",
                column: "GuestID");

            migrationBuilder.CreateIndex(
                name: "IX_Member_GuestID",
                table: "Member",
                column: "GuestID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mode",
                table: "Dossier");

            migrationBuilder.DropTable(
                name: "Document");

            migrationBuilder.DropTable(
                name: "Encour");

            migrationBuilder.DropTable(
                name: "GuestInAcheteur");

            migrationBuilder.DropTable(
                name: "Member");

            migrationBuilder.DropTable(
                name: "Guest");
        }
    }
}
