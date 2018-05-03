using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace HAICOP.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Acheteur",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Lbl = table.Column<string>(maxLength: 255, nullable: false),
                    Nature = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Acheteur", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 255, nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    Auto = table.Column<bool>(nullable: false),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    FirstLastName = table.Column<string>(maxLength: 255, nullable: false),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 255, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 255, nullable: true),
                    Num = table.Column<int>(nullable: false),
                    PasswordHash = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    SecurityStamp = table.Column<string>(nullable: true),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Commission",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Code = table.Column<string>(maxLength: 100, nullable: true),
                    HavePresident = table.Column<bool>(nullable: false),
                    Lbl = table.Column<string>(maxLength: 250, nullable: false),
                    LblFr = table.Column<string>(maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Commission", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Dessision",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Lbl = table.Column<string>(maxLength: 200, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dessision", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "ForeignInvestisseur",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Name = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ForeignInvestisseur", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Fournisseur",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Lbl = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fournisseur", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "OJ",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    CommissionID = table.Column<int>(nullable: false),
                    Num = table.Column<decimal>(nullable: false),
                    Year = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OJ", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Suivie",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    ContractualTerm = table.Column<int>(nullable: false),
                    DateAcceptationFinale = table.Column<DateTime>(nullable: false),
                    DateAdmissionProvisoire = table.Column<DateTime>(nullable: false),
                    DateDebu = table.Column<DateTime>(nullable: false),
                    DateFichierJointFinal = table.Column<DateTime>(nullable: false),
                    DateMotifsAnnulation = table.Column<string>(nullable: true),
                    DateTraveau = table.Column<DateTime>(nullable: false),
                    DeclarationMethodes = table.Column<string>(nullable: true),
                    EvaluationAcheteur = table.Column<string>(maxLength: 500, nullable: true),
                    FinalGuaranteeM = table.Column<decimal>(nullable: false),
                    FinalGuaranteeP = table.Column<decimal>(nullable: false),
                    MontantPenalitesFournisseur = table.Column<decimal>(nullable: false),
                    MontantPenalitesRetard = table.Column<decimal>(nullable: false),
                    NaturePrice = table.Column<int>(nullable: false),
                    NombreJoursRetard = table.Column<int>(nullable: false),
                    StatementReasonsDates = table.Column<string>(maxLength: 500, nullable: true),
                    TitleGuaranteeM = table.Column<decimal>(nullable: false),
                    TitleGuaranteeP = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Suivie", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(maxLength: 255, nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Discriminator = table.Column<string>(nullable: false),
                    Name = table.Column<string>(maxLength: 255, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 255, nullable: true),
                    Description = table.Column<string>(maxLength: 255, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(maxLength: 255, nullable: false),
                    LoginProvider = table.Column<string>(maxLength: 255, nullable: false),
                    Name = table.Column<string>(maxLength: 255, nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                });

            migrationBuilder.CreateTable(
                name: "AcheteurDetail",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    AcheteurID = table.Column<int>(nullable: false),
                    Email = table.Column<string>(nullable: true),
                    Fax = table.Column<string>(nullable: true),
                    FirstLastName = table.Column<string>(maxLength: 500, nullable: false),
                    Tel = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AcheteurDetail", x => x.ID);
                    table.ForeignKey(
                        name: "FK_AcheteurDetail_Acheteur_AcheteurID",
                        column: x => x.AcheteurID,
                        principalTable: "Acheteur",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Guest",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    AcheteurID = table.Column<int>(nullable: false),
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
                    table.ForeignKey(
                        name: "FK_Guest_Acheteur_AcheteurID",
                        column: x => x.AcheteurID,
                        principalTable: "Acheteur",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(maxLength: 255, nullable: false),
                    ProviderKey = table.Column<string>(maxLength: 255, nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Agent",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    CommissionID = table.Column<int>(nullable: false),
                    IsPresident = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(maxLength: 255, nullable: false),
                    NameFr = table.Column<string>(maxLength: 250, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agent", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Agent_Commission_CommissionID",
                        column: x => x.CommissionID,
                        principalTable: "Commission",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Dossier",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Cause = table.Column<int>(nullable: false),
                    CommissionID = table.Column<int>(nullable: false),
                    DocDate = table.Column<DateTime>(nullable: false),
                    EnterDate = table.Column<DateTime>(nullable: false),
                    Financement = table.Column<int>(nullable: false),
                    Foreign = table.Column<string>(maxLength: 250, nullable: true),
                    Mode = table.Column<int>(nullable: false),
                    Nature = table.Column<int>(nullable: false),
                    Num = table.Column<decimal>(nullable: false),
                    ProDate = table.Column<DateTime>(nullable: false),
                    State = table.Column<int>(nullable: false),
                    Subject = table.Column<string>(maxLength: 500, nullable: false),
                    TotalForeign = table.Column<decimal>(nullable: false),
                    TotalLocal = table.Column<decimal>(nullable: false),
                    TraitDate = table.Column<DateTime>(nullable: false),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dossier", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Dossier_Commission_CommissionID",
                        column: x => x.CommissionID,
                        principalTable: "Commission",
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

            migrationBuilder.CreateTable(
                name: "UserCommission",
                columns: table => new
                {
                    UserID = table.Column<string>(maxLength: 255, nullable: false),
                    CommissionID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserCommission", x => new { x.UserID, x.CommissionID });
                    table.UniqueConstraint("AK_UserCommission_CommissionID_UserID", x => new { x.CommissionID, x.UserID });
                    table.ForeignKey(
                        name: "FK_UserCommission_Commission_CommissionID",
                        column: x => x.CommissionID,
                        principalTable: "Commission",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserCommission_AspNetUsers_UserID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "FournisseurDetail",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Activity = table.Column<string>(nullable: false),
                    Category = table.Column<string>(nullable: true),
                    FournisseurID = table.Column<int>(nullable: false),
                    Nationalite = table.Column<string>(nullable: false),
                    Speciality = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FournisseurDetail", x => x.ID);
                    table.ForeignKey(
                        name: "FK_FournisseurDetail_Fournisseur_FournisseurID",
                        column: x => x.FournisseurID,
                        principalTable: "Fournisseur",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true),
                    RoleId = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(maxLength: 255, nullable: false),
                    RoleId = table.Column<string>(maxLength: 255, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Invite",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    GuestID = table.Column<int>(nullable: false),
                    OJID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invite", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Invite_Guest_GuestID",
                        column: x => x.GuestID,
                        principalTable: "Guest",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Invite_OJ_OJID",
                        column: x => x.OJID,
                        principalTable: "OJ",
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
                        name: "FK_Member_Guest_GuestID",
                        column: x => x.GuestID,
                        principalTable: "Guest",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "UserAgent",
                columns: table => new
                {
                    UserID = table.Column<string>(maxLength: 255, nullable: false),
                    AgentID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAgent", x => new { x.UserID, x.AgentID });
                    table.UniqueConstraint("AK_UserAgent_AgentID_UserID", x => new { x.AgentID, x.UserID });
                    table.ForeignKey(
                        name: "FK_UserAgent_Agent_AgentID",
                        column: x => x.AgentID,
                        principalTable: "Agent",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAgent_AspNetUsers_UserID",
                        column: x => x.UserID,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AchInDossier",
                columns: table => new
                {
                    AcheteurID = table.Column<int>(nullable: false),
                    DossierID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AchInDossier", x => new { x.AcheteurID, x.DossierID });
                    table.ForeignKey(
                        name: "FK_AchInDossier_Acheteur_AcheteurID",
                        column: x => x.AcheteurID,
                        principalTable: "Acheteur",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AchInDossier_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Desc",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Description = table.Column<string>(maxLength: 1000, nullable: true),
                    DossierID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Desc", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Desc_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DocInOJ",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Date = table.Column<DateTime>(nullable: false),
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
                name: "FourInDossier",
                columns: table => new
                {
                    FournisseurID = table.Column<int>(nullable: false),
                    DossierID = table.Column<int>(nullable: false),
                    Done = table.Column<bool>(nullable: false),
                    Foreign = table.Column<bool>(nullable: false),
                    Lbl = table.Column<string>(maxLength: 200, nullable: true),
                    MettingDate = table.Column<DateTime>(nullable: false),
                    Montant = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FourInDossier", x => new { x.FournisseurID, x.DossierID });
                    table.UniqueConstraint("AK_FourInDossier_DossierID_FournisseurID", x => new { x.DossierID, x.FournisseurID });
                    table.ForeignKey(
                        name: "FK_FourInDossier_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_FourInDossier_Fournisseur_FournisseurID",
                        column: x => x.FournisseurID,
                        principalTable: "Fournisseur",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InvInDossier",
                columns: table => new
                {
                    ForeignInvestisseurID = table.Column<int>(nullable: false),
                    DossierID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InvInDossier", x => new { x.ForeignInvestisseurID, x.DossierID });
                    table.UniqueConstraint("AK_InvInDossier_DossierID_ForeignInvestisseurID", x => new { x.DossierID, x.ForeignInvestisseurID });
                    table.ForeignKey(
                        name: "FK_InvInDossier_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InvInDossier_ForeignInvestisseur_ForeignInvestisseurID",
                        column: x => x.ForeignInvestisseurID,
                        principalTable: "ForeignInvestisseur",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Mail",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    Desc = table.Column<string>(maxLength: 500, nullable: true),
                    DossierID = table.Column<int>(nullable: false),
                    From = table.Column<string>(maxLength: 255, nullable: false),
                    MailDate = table.Column<DateTime>(nullable: false),
                    MailNature = table.Column<int>(nullable: false),
                    MailType = table.Column<int>(nullable: false),
                    MettingID = table.Column<int>(nullable: false),
                    OriginRef = table.Column<string>(maxLength: 20, nullable: true),
                    Ref = table.Column<string>(maxLength: 20, nullable: false),
                    Url = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mail", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Mail_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Metting",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    DossierID = table.Column<int>(nullable: false),
                    MettDate = table.Column<DateTime>(nullable: false),
                    MettDesc = table.Column<string>(maxLength: 500, nullable: true),
                    MettNbr = table.Column<int>(nullable: false),
                    NotifDate = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Metting", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Metting_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Rapporteur",
                columns: table => new
                {
                    AgentID = table.Column<int>(nullable: false),
                    DossierID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rapporteur", x => new { x.AgentID, x.DossierID });
                    table.ForeignKey(
                        name: "FK_Rapporteur_Agent_AgentID",
                        column: x => x.AgentID,
                        principalTable: "Agent",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Rapporteur_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AffectTrend",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    AcheteurDetailID = table.Column<int>(nullable: false),
                    DossierID = table.Column<int>(nullable: false),
                    Financement = table.Column<int>(nullable: false),
                    FournisseurDetailID = table.Column<int>(nullable: false),
                    Subject = table.Column<string>(maxLength: 500, nullable: false),
                    TotalLocal = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AffectTrend", x => x.ID);
                    table.ForeignKey(
                        name: "FK_AffectTrend_AcheteurDetail_AcheteurDetailID",
                        column: x => x.AcheteurDetailID,
                        principalTable: "AcheteurDetail",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AffectTrend_Dossier_DossierID",
                        column: x => x.DossierID,
                        principalTable: "Dossier",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AffectTrend_FournisseurDetail_FournisseurDetailID",
                        column: x => x.FournisseurDetailID,
                        principalTable: "FournisseurDetail",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DessisionInMetting",
                columns: table => new
                {
                    DessisionID = table.Column<int>(nullable: false),
                    MettingID = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DessisionInMetting", x => new { x.DessisionID, x.MettingID });
                    table.ForeignKey(
                        name: "FK_DessisionInMetting_Dessision_DessisionID",
                        column: x => x.DessisionID,
                        principalTable: "Dessision",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_DessisionInMetting_Metting_MettingID",
                        column: x => x.MettingID,
                        principalTable: "Metting",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Balance",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    AffectTrendID = table.Column<int>(nullable: false),
                    CritereComplex = table.Column<string>(maxLength: 250, nullable: true),
                    CritereImportance = table.Column<string>(maxLength: 250, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Balance", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Balance_AffectTrend_AffectTrendID",
                        column: x => x.AffectTrendID,
                        principalTable: "AffectTrend",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Concurrence",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    AffectTrendID = table.Column<int>(nullable: false),
                    NbrChaier = table.Column<int>(nullable: false),
                    NbrOffre = table.Column<int>(nullable: false),
                    NbrOffreFinance = table.Column<int>(nullable: false),
                    NbrSuppBeforeFinance = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Concurrence", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Concurrence_AffectTrend_AffectTrendID",
                        column: x => x.AffectTrendID,
                        principalTable: "AffectTrend",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DossierDelais",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    AffectTrendID = table.Column<int>(nullable: false),
                    DateAnConc = table.Column<DateTime>(nullable: false),
                    DateAvis = table.Column<DateTime>(nullable: false),
                    DateDebu = table.Column<DateTime>(nullable: false),
                    DateLastChanceAccept = table.Column<DateTime>(nullable: false),
                    DateOpen = table.Column<DateTime>(nullable: false),
                    DatePro = table.Column<DateTime>(nullable: false),
                    DateTraveau = table.Column<DateTime>(nullable: false),
                    DelaiTraveau = table.Column<string>(maxLength: 500, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DossierDelais", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DossierDelais_AffectTrend_AffectTrendID",
                        column: x => x.AffectTrendID,
                        principalTable: "AffectTrend",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DossierDetail",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    AffectTrendID = table.Column<int>(nullable: false),
                    IsSmall = table.Column<bool>(nullable: false),
                    NbrLot = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DossierDetail", x => x.ID);
                    table.ForeignKey(
                        name: "FK_DossierDetail_AffectTrend_AffectTrendID",
                        column: x => x.AffectTrendID,
                        principalTable: "AffectTrend",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Estimation",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    AffectTrendID = table.Column<int>(nullable: false),
                    Lbl = table.Column<int>(nullable: false),
                    Montant = table.Column<decimal>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Estimation", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Estimation_AffectTrend_AffectTrendID",
                        column: x => x.AffectTrendID,
                        principalTable: "AffectTrend",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InfoValeur",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    AffectTrendID = table.Column<int>(nullable: false),
                    Description = table.Column<string>(maxLength: 500, nullable: true),
                    MethodPrice = table.Column<int>(nullable: false),
                    NaturePrice = table.Column<int>(nullable: false),
                    NbrFinance = table.Column<int>(nullable: false),
                    NbrTech = table.Column<int>(nullable: false),
                    TotalEstimation = table.Column<decimal>(nullable: false),
                    Valeur = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InfoValeur", x => x.ID);
                    table.ForeignKey(
                        name: "FK_InfoValeur_AffectTrend_AffectTrendID",
                        column: x => x.AffectTrendID,
                        principalTable: "AffectTrend",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Moinsdis",
                columns: table => new
                {
                    ID = table.Column<int>(nullable: false)
                        .Annotation("MySql:ValueGeneratedOnAdd", true),
                    AffectTrendID = table.Column<int>(nullable: false),
                    Critere = table.Column<string>(maxLength: 250, nullable: true),
                    NbrConform = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Moinsdis", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Moinsdis_AffectTrend_AffectTrendID",
                        column: x => x.AffectTrendID,
                        principalTable: "AffectTrend",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Acheteur_Lbl",
                table: "Acheteur",
                column: "Lbl",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AcheteurDetail_AcheteurID",
                table: "AcheteurDetail",
                column: "AcheteurID");

            migrationBuilder.CreateIndex(
                name: "IX_AchInDossier_DossierID",
                table: "AchInDossier",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "IX_AffectTrend_AcheteurDetailID",
                table: "AffectTrend",
                column: "AcheteurDetailID");

            migrationBuilder.CreateIndex(
                name: "IX_AffectTrend_DossierID",
                table: "AffectTrend",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "IX_AffectTrend_FournisseurDetailID",
                table: "AffectTrend",
                column: "FournisseurDetailID");

            migrationBuilder.CreateIndex(
                name: "IX_Agent_CommissionID",
                table: "Agent",
                column: "CommissionID");

            migrationBuilder.CreateIndex(
                name: "IX_Agent_Name",
                table: "Agent",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Balance_AffectTrendID",
                table: "Balance",
                column: "AffectTrendID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Concurrence_AffectTrendID",
                table: "Concurrence",
                column: "AffectTrendID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Desc_DossierID",
                table: "Desc",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "IX_DessisionInMetting_MettingID",
                table: "DessisionInMetting",
                column: "MettingID");

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
                name: "IX_Dossier_CommissionID",
                table: "Dossier",
                column: "CommissionID");

            migrationBuilder.CreateIndex(
                name: "IX_Dossier_ProDate_Num_CommissionID",
                table: "Dossier",
                columns: new[] { "ProDate", "Num", "CommissionID" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DossierDelais_AffectTrendID",
                table: "DossierDelais",
                column: "AffectTrendID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DossierDetail_AffectTrendID",
                table: "DossierDetail",
                column: "AffectTrendID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Encour_CommissionID",
                table: "Encour",
                column: "CommissionID");

            migrationBuilder.CreateIndex(
                name: "IX_Estimation_AffectTrendID",
                table: "Estimation",
                column: "AffectTrendID");

            migrationBuilder.CreateIndex(
                name: "IX_ForeignInvestisseur_Name",
                table: "ForeignInvestisseur",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Fournisseur_Lbl",
                table: "Fournisseur",
                column: "Lbl",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_FournisseurDetail_FournisseurID",
                table: "FournisseurDetail",
                column: "FournisseurID");

            migrationBuilder.CreateIndex(
                name: "IX_Guest_AcheteurID",
                table: "Guest",
                column: "AcheteurID");

            migrationBuilder.CreateIndex(
                name: "IX_InfoValeur_AffectTrendID",
                table: "InfoValeur",
                column: "AffectTrendID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invite_GuestID",
                table: "Invite",
                column: "GuestID");

            migrationBuilder.CreateIndex(
                name: "IX_Invite_OJID",
                table: "Invite",
                column: "OJID");

            migrationBuilder.CreateIndex(
                name: "IX_Mail_DossierID",
                table: "Mail",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "IX_Member_GuestID",
                table: "Member",
                column: "GuestID");

            migrationBuilder.CreateIndex(
                name: "IX_Metting_DossierID",
                table: "Metting",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "IX_Moinsdis_AffectTrendID",
                table: "Moinsdis",
                column: "AffectTrendID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Rapporteur_DossierID",
                table: "Rapporteur",
                column: "DossierID");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AchInDossier");

            migrationBuilder.DropTable(
                name: "Balance");

            migrationBuilder.DropTable(
                name: "Concurrence");

            migrationBuilder.DropTable(
                name: "Desc");

            migrationBuilder.DropTable(
                name: "DessisionInMetting");

            migrationBuilder.DropTable(
                name: "DocInOJ");

            migrationBuilder.DropTable(
                name: "Document");

            migrationBuilder.DropTable(
                name: "DossierDelais");

            migrationBuilder.DropTable(
                name: "DossierDetail");

            migrationBuilder.DropTable(
                name: "Encour");

            migrationBuilder.DropTable(
                name: "Estimation");

            migrationBuilder.DropTable(
                name: "FourInDossier");

            migrationBuilder.DropTable(
                name: "InfoValeur");

            migrationBuilder.DropTable(
                name: "InvInDossier");

            migrationBuilder.DropTable(
                name: "Invite");

            migrationBuilder.DropTable(
                name: "Mail");

            migrationBuilder.DropTable(
                name: "Member");

            migrationBuilder.DropTable(
                name: "Moinsdis");

            migrationBuilder.DropTable(
                name: "NextNum");

            migrationBuilder.DropTable(
                name: "Rapporteur");

            migrationBuilder.DropTable(
                name: "Suivie");

            migrationBuilder.DropTable(
                name: "UserAgent");

            migrationBuilder.DropTable(
                name: "UserCommission");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Dessision");

            migrationBuilder.DropTable(
                name: "Metting");

            migrationBuilder.DropTable(
                name: "ForeignInvestisseur");

            migrationBuilder.DropTable(
                name: "OJ");

            migrationBuilder.DropTable(
                name: "Guest");

            migrationBuilder.DropTable(
                name: "AffectTrend");

            migrationBuilder.DropTable(
                name: "Agent");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "AcheteurDetail");

            migrationBuilder.DropTable(
                name: "Dossier");

            migrationBuilder.DropTable(
                name: "FournisseurDetail");

            migrationBuilder.DropTable(
                name: "Acheteur");

            migrationBuilder.DropTable(
                name: "Commission");

            migrationBuilder.DropTable(
                name: "Fournisseur");
        }
    }
}
