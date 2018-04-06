using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using HAICOP.Data;
using HAICOP.Models;

namespace HAICOP.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20180322153647_add suivie table")]
    partial class addsuivietable
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.2");

            modelBuilder.Entity("HAICOP.Models.Acheteur", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Lbl")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<int>("Nature");

                    b.HasKey("ID");

                    b.HasIndex("Lbl")
                        .IsUnique();

                    b.ToTable("Acheteur");
                });

            modelBuilder.Entity("HAICOP.Models.AcheteurDetail", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AcheteurID");

                    b.Property<string>("Fax")
                        .IsRequired();

                    b.Property<string>("FirstLastName")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<string>("Tel")
                        .IsRequired();

                    b.HasKey("ID");

                    b.HasIndex("AcheteurID");

                    b.ToTable("AcheteurDetail");
                });

            modelBuilder.Entity("HAICOP.Models.AchInDossier", b =>
                {
                    b.Property<int>("AcheteurID");

                    b.Property<int>("DossierID");

                    b.HasKey("AcheteurID", "DossierID");

                    b.HasIndex("DossierID");

                    b.ToTable("AchInDossier");
                });

            modelBuilder.Entity("HAICOP.Models.Agent", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CommissionID");

                    b.Property<bool>("IsPresident");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<string>("NameFr")
                        .IsRequired()
                        .HasMaxLength(250);

                    b.HasKey("ID");

                    b.HasIndex("CommissionID");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("Agent");
                });

            modelBuilder.Entity("HAICOP.Models.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(255);

                    b.Property<int>("AccessFailedCount");

                    b.Property<bool>("Auto");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstLastName")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(255);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(255);

                    b.Property<int>("Num");

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("HAICOP.Models.Balance", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CritereComplex")
                        .HasMaxLength(250);

                    b.Property<string>("CritereImportance")
                        .HasMaxLength(250);

                    b.Property<int>("DossierID");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.ToTable("Balance");
                });

            modelBuilder.Entity("HAICOP.Models.Commission", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code")
                        .HasMaxLength(100);

                    b.Property<bool>("HavePresident");

                    b.Property<string>("Lbl")
                        .IsRequired()
                        .HasMaxLength(250);

                    b.Property<string>("LblFr")
                        .HasMaxLength(250);

                    b.HasKey("ID");

                    b.ToTable("Commission");
                });

            modelBuilder.Entity("HAICOP.Models.Concurrence", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DossierID");

                    b.Property<int>("NbrChaier");

                    b.Property<int>("NbrOffre");

                    b.Property<int>("NbrOffreFinance");

                    b.Property<int>("NbrSuppBeforeFinance");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.ToTable("Concurrence");
                });

            modelBuilder.Entity("HAICOP.Models.Desc", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description")
                        .HasMaxLength(1000);

                    b.Property<int>("DossierID");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.ToTable("Desc");
                });

            modelBuilder.Entity("HAICOP.Models.Dessision", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Lbl")
                        .IsRequired()
                        .HasMaxLength(200);

                    b.HasKey("ID");

                    b.ToTable("Dessision");
                });

            modelBuilder.Entity("HAICOP.Models.DessisionInMetting", b =>
                {
                    b.Property<int>("DessisionID");

                    b.Property<int>("MettingID");

                    b.HasKey("DessisionID", "MettingID");

                    b.HasIndex("MettingID");

                    b.ToTable("DessisionInMetting");
                });

            modelBuilder.Entity("HAICOP.Models.DocInOJ", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<int>("DossierID");

                    b.Property<int>("OJID");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.HasIndex("OJID");

                    b.ToTable("DocInOJ");
                });

            modelBuilder.Entity("HAICOP.Models.Document", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("Date");

                    b.Property<int>("DossierID");

                    b.Property<int>("Nature");

                    b.Property<string>("RealPath")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<string>("Url");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.ToTable("Document");
                });

            modelBuilder.Entity("HAICOP.Models.Dossier", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CommissionID");

                    b.Property<DateTime>("DocDate");

                    b.Property<DateTime>("EnterDate");

                    b.Property<int>("Financement");

                    b.Property<string>("Foreign")
                        .HasMaxLength(250);

                    b.Property<int>("Mode");

                    b.Property<int>("Nature");

                    b.Property<decimal>("Num");

                    b.Property<DateTime>("ProDate");

                    b.Property<int>("State");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<decimal>("TotalForeign");

                    b.Property<decimal>("TotalLocal");

                    b.Property<DateTime>("TraitDate");

                    b.Property<int>("Type");

                    b.HasKey("ID");

                    b.HasIndex("CommissionID");

                    b.HasIndex("ProDate", "Num", "CommissionID")
                        .IsUnique();

                    b.ToTable("Dossier");
                });

            modelBuilder.Entity("HAICOP.Models.DossierDelais", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("DateAnConc");

                    b.Property<DateTime>("DateAvis");

                    b.Property<DateTime>("DateDebu");

                    b.Property<DateTime>("DateLastChanceAccept");

                    b.Property<DateTime>("DateOpen");

                    b.Property<DateTime>("DatePro");

                    b.Property<DateTime>("DateTraveau");

                    b.Property<string>("DelaiTraveau")
                        .IsRequired()
                        .HasMaxLength(500);

                    b.Property<int>("DossierID");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.ToTable("DossierDelais");
                });

            modelBuilder.Entity("HAICOP.Models.DossierDetail", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AcheteurDetailID");

                    b.Property<int>("DossierID");

                    b.Property<bool>("IsSmall");

                    b.Property<int>("NbrLot");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.ToTable("DossierDetail");
                });

            modelBuilder.Entity("HAICOP.Models.Encour", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccordCadre");

                    b.Property<int>("Avenant");

                    b.Property<int>("CommissionID");

                    b.Property<int>("Consultation");

                    b.Property<int>("Debat");

                    b.Property<int>("Final");

                    b.Property<int>("Fouillement");

                    b.Property<int>("NegociationDirect");

                    b.Property<int>("RapportFinanceTechnique");

                    b.HasKey("ID");

                    b.HasIndex("CommissionID");

                    b.ToTable("Encour");
                });

            modelBuilder.Entity("HAICOP.Models.Estimation", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DossierID");

                    b.Property<int>("Lbl");

                    b.Property<decimal>("Montant");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.ToTable("Estimation");
                });

            modelBuilder.Entity("HAICOP.Models.ForeignInvestisseur", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("ID");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("ForeignInvestisseur");
                });

            modelBuilder.Entity("HAICOP.Models.FourInDossier", b =>
                {
                    b.Property<int>("FournisseurID");

                    b.Property<int>("DossierID");

                    b.Property<bool>("Done");

                    b.Property<bool>("Foreign");

                    b.Property<string>("Lbl")
                        .HasMaxLength(200);

                    b.Property<DateTime>("MettingDate");

                    b.Property<decimal>("Montant");

                    b.HasKey("FournisseurID", "DossierID");

                    b.HasAlternateKey("DossierID", "FournisseurID");

                    b.ToTable("FourInDossier");
                });

            modelBuilder.Entity("HAICOP.Models.Fournisseur", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Lbl")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("ID");

                    b.HasIndex("Lbl")
                        .IsUnique();

                    b.ToTable("Fournisseur");
                });

            modelBuilder.Entity("HAICOP.Models.FournisseurDetail", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Activity")
                        .IsRequired();

                    b.Property<string>("Category");

                    b.Property<int>("FournisseurID");

                    b.Property<string>("Nationalite")
                        .IsRequired();

                    b.Property<string>("Speciality");

                    b.HasKey("ID");

                    b.HasIndex("FournisseurID");

                    b.ToTable("FournisseurDetail");
                });

            modelBuilder.Entity("HAICOP.Models.Guest", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AcheteurID");

                    b.Property<string>("Desc")
                        .HasMaxLength(500);

                    b.Property<string>("Email")
                        .IsRequired();

                    b.Property<string>("FirstLastName")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<string>("Fix");

                    b.Property<string>("Tel");

                    b.Property<int>("Type");

                    b.HasKey("ID");

                    b.HasIndex("AcheteurID");

                    b.ToTable("Guest");
                });

            modelBuilder.Entity("HAICOP.Models.InfoValeur", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description")
                        .HasMaxLength(500);

                    b.Property<int>("DossierID");

                    b.Property<int>("MethodPrice");

                    b.Property<int>("NaturePrice");

                    b.Property<int>("NbrFinance");

                    b.Property<int>("NbrTech");

                    b.Property<decimal>("TotalEstimation");

                    b.Property<int>("Valeur");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.ToTable("InfoValeur");
                });

            modelBuilder.Entity("HAICOP.Models.InvInDossier", b =>
                {
                    b.Property<int>("ForeignInvestisseurID");

                    b.Property<int>("DossierID");

                    b.HasKey("ForeignInvestisseurID", "DossierID");

                    b.HasAlternateKey("DossierID", "ForeignInvestisseurID");

                    b.ToTable("InvInDossier");
                });

            modelBuilder.Entity("HAICOP.Models.Invite", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("GuestID");

                    b.Property<int>("OJID");

                    b.HasKey("ID");

                    b.HasIndex("GuestID");

                    b.HasIndex("OJID");

                    b.ToTable("Invite");
                });

            modelBuilder.Entity("HAICOP.Models.Mail", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Desc")
                        .HasMaxLength(500);

                    b.Property<int>("DossierID");

                    b.Property<string>("From")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.Property<DateTime>("MailDate");

                    b.Property<int>("MailNature");

                    b.Property<int>("MailType");

                    b.Property<int>("MettingID");

                    b.Property<string>("OriginRef")
                        .HasMaxLength(20);

                    b.Property<string>("Ref")
                        .IsRequired()
                        .HasMaxLength(20);

                    b.Property<string>("Url");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.ToTable("Mail");
                });

            modelBuilder.Entity("HAICOP.Models.Member", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CommissionID");

                    b.Property<int>("GuestID");

                    b.HasKey("ID");

                    b.HasIndex("GuestID");

                    b.ToTable("Member");
                });

            modelBuilder.Entity("HAICOP.Models.Metting", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("DossierID");

                    b.Property<DateTime>("MettDate");

                    b.Property<string>("MettDesc")
                        .HasMaxLength(500);

                    b.Property<int>("MettNbr");

                    b.Property<DateTime>("NotifDate");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.ToTable("Metting");
                });

            modelBuilder.Entity("HAICOP.Models.Moinsdis", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Critere")
                        .HasMaxLength(250);

                    b.Property<int>("DossierID");

                    b.Property<int>("NbrConform");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.ToTable("Moinsdis");
                });

            modelBuilder.Entity("HAICOP.Models.NextNum", b =>
                {
                    b.Property<int>("CommissionID");

                    b.Property<int>("Next");

                    b.HasKey("CommissionID");

                    b.ToTable("NextNum");
                });

            modelBuilder.Entity("HAICOP.Models.OJ", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CommissionID");

                    b.Property<decimal>("Num");

                    b.Property<int>("Year");

                    b.HasKey("ID");

                    b.ToTable("OJ");
                });

            modelBuilder.Entity("HAICOP.Models.Rapporteur", b =>
                {
                    b.Property<int>("AgentID");

                    b.Property<int>("DossierID");

                    b.HasKey("AgentID", "DossierID");

                    b.HasIndex("DossierID");

                    b.ToTable("Rapporteur");
                });

            modelBuilder.Entity("HAICOP.Models.Suivie", b =>
                {
                    b.Property<int>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ContractualTerm");

                    b.Property<DateTime>("DateAcceptationFinale");

                    b.Property<DateTime>("DateAdmissionProvisoire");

                    b.Property<DateTime>("DateDebu");

                    b.Property<DateTime>("DateFichierJointFinal");

                    b.Property<string>("DateMotifsAnnulation");

                    b.Property<DateTime>("DateTraveau");

                    b.Property<string>("DeclarationMethodes")
                        .IsRequired();

                    b.Property<int>("DossierID");

                    b.Property<string>("EvaluationAcheteur")
                        .HasMaxLength(500);

                    b.Property<decimal>("FinalGuaranteeM");

                    b.Property<decimal>("FinalGuaranteeP");

                    b.Property<decimal>("MontantPenalitesFournisseur");

                    b.Property<decimal>("MontantPenalitesRetard");

                    b.Property<int>("NaturePrice");

                    b.Property<int>("NombreJoursRetard");

                    b.Property<string>("StatementReasonsDates")
                        .HasMaxLength(500);

                    b.Property<decimal>("TitleGuaranteeM");

                    b.Property<decimal>("TitleGuaranteeP");

                    b.HasKey("ID");

                    b.HasIndex("DossierID");

                    b.ToTable("Suivie");
                });

            modelBuilder.Entity("HAICOP.Models.UserAgent", b =>
                {
                    b.Property<string>("UserID")
                        .HasMaxLength(255);

                    b.Property<int>("AgentID");

                    b.HasKey("UserID", "AgentID");

                    b.HasAlternateKey("AgentID", "UserID");

                    b.ToTable("UserAgent");
                });

            modelBuilder.Entity("HAICOP.Models.UserCommission", b =>
                {
                    b.Property<string>("UserID")
                        .HasMaxLength(255);

                    b.Property<int>("CommissionID");

                    b.HasKey("UserID", "CommissionID");

                    b.HasAlternateKey("CommissionID", "UserID");

                    b.ToTable("UserCommission");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasMaxLength(255);

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Discriminator")
                        .IsRequired();

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityRole");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasMaxLength(255);

                    b.Property<string>("ProviderKey")
                        .HasMaxLength(255);

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasMaxLength(255);

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasMaxLength(255);

                    b.Property<string>("RoleId")
                        .HasMaxLength(255);

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasMaxLength(255);

                    b.Property<string>("LoginProvider")
                        .HasMaxLength(255);

                    b.Property<string>("Name")
                        .HasMaxLength(255);

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("HAICOP.Models.ApplicationRole", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole");

                    b.Property<string>("Description")
                        .HasMaxLength(255);

                    b.ToTable("ApplicationRole");

                    b.HasDiscriminator().HasValue("ApplicationRole");
                });

            modelBuilder.Entity("HAICOP.Models.AcheteurDetail", b =>
                {
                    b.HasOne("HAICOP.Models.Acheteur", "Acheteur")
                        .WithMany()
                        .HasForeignKey("AcheteurID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.AchInDossier", b =>
                {
                    b.HasOne("HAICOP.Models.Acheteur", "Acheteur")
                        .WithMany()
                        .HasForeignKey("AcheteurID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Agent", b =>
                {
                    b.HasOne("HAICOP.Models.Commission", "Commission")
                        .WithMany("Agents")
                        .HasForeignKey("CommissionID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Balance", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Concurrence", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Desc", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany("Descriptions")
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.DessisionInMetting", b =>
                {
                    b.HasOne("HAICOP.Models.Dessision", "Dessision")
                        .WithMany()
                        .HasForeignKey("DessisionID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.Metting", "Metting")
                        .WithMany()
                        .HasForeignKey("MettingID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.DocInOJ", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.OJ", "OJ")
                        .WithMany("Dossier")
                        .HasForeignKey("OJID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Document", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany("Documents")
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Dossier", b =>
                {
                    b.HasOne("HAICOP.Models.Commission", "Commission")
                        .WithMany("Dossiers")
                        .HasForeignKey("CommissionID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.DossierDelais", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.DossierDetail", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Encour", b =>
                {
                    b.HasOne("HAICOP.Models.Commission", "Commission")
                        .WithMany("Encours")
                        .HasForeignKey("CommissionID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Estimation", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.FourInDossier", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.Fournisseur", "Fournisseur")
                        .WithMany()
                        .HasForeignKey("FournisseurID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.FournisseurDetail", b =>
                {
                    b.HasOne("HAICOP.Models.Fournisseur", "Fournisseur")
                        .WithMany()
                        .HasForeignKey("FournisseurID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Guest", b =>
                {
                    b.HasOne("HAICOP.Models.Acheteur", "Acheteur")
                        .WithMany()
                        .HasForeignKey("AcheteurID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.InfoValeur", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.InvInDossier", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.ForeignInvestisseur", "ForeignInvestisseur")
                        .WithMany()
                        .HasForeignKey("ForeignInvestisseurID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Invite", b =>
                {
                    b.HasOne("HAICOP.Models.Guest", "Guest")
                        .WithMany()
                        .HasForeignKey("GuestID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.OJ", "OJ")
                        .WithMany("Invite")
                        .HasForeignKey("OJID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Mail", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany("Mails")
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Member", b =>
                {
                    b.HasOne("HAICOP.Models.Guest", "Guest")
                        .WithMany()
                        .HasForeignKey("GuestID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Metting", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany("Mettings")
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Moinsdis", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.NextNum", b =>
                {
                    b.HasOne("HAICOP.Models.Commission", "Commission")
                        .WithOne("NextNum")
                        .HasForeignKey("HAICOP.Models.NextNum", "CommissionID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Rapporteur", b =>
                {
                    b.HasOne("HAICOP.Models.Agent", "Agent")
                        .WithMany()
                        .HasForeignKey("AgentID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.Suivie", b =>
                {
                    b.HasOne("HAICOP.Models.Dossier", "Dossier")
                        .WithMany()
                        .HasForeignKey("DossierID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.UserAgent", b =>
                {
                    b.HasOne("HAICOP.Models.Agent", "Agent")
                        .WithMany()
                        .HasForeignKey("AgentID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("HAICOP.Models.UserCommission", b =>
                {
                    b.HasOne("HAICOP.Models.Commission", "Commission")
                        .WithMany()
                        .HasForeignKey("CommissionID")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.ApplicationUser", "User")
                        .WithMany()
                        .HasForeignKey("UserID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("HAICOP.Models.ApplicationUser")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("HAICOP.Models.ApplicationUser")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("HAICOP.Models.ApplicationUser")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
