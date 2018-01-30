using System;
using System.Collections.Generic;
using System.Linq;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;


namespace HAICOP.Models
{



	public class MonthStat
	{
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "من")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime From { get ; set;}
		
		[Required(ErrorMessage = "اجباري")]
		[Display(Name = "إلى")]
		[DataType(DataType.Date)]
		[DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
		public DateTime To { get ; set;}

	}

	public class TestMonth
	{
		public List<Dossier> Lst {get ; set;}
		public int Count { get ; set;}
		public string Lbl {get ; set;}
		public int Nbr { get ; set;}

		[DisplayFormat(DataFormatString = "{0:N3}", ApplyFormatInEditMode = true)]
		public decimal Montant { get ; set;}
		[DisplayFormat(DataFormatString = "{0:F2}", ApplyFormatInEditMode = true)]
		public decimal Poucentage { get ; set;}

        public TestMonth()
        {
            Count = 0;
            Lbl = null;
            Nbr = 0;
            Montant = 0;
        }
	}

	public class DashboardComm : TestMonth
	{
		public int Trait { get ; set;}
		public int NonTrait  {get ; set;}
		public int Accept { get ; set;}
		public int Refu {get ; set;}

		public int Petition { get ; set;}

		public int PetitionOk { get ; set;}
		public int PetitionNotOk { get ; set;}

        public int CommissionID { get; set; }
		public DashboardComm()
		{
			Trait = 0;
			NonTrait = 0;
			Accept = 0;
			Refu = 0;
			Lst  = null;
			Petition = 0;
			PetitionOk = 0;
			PetitionNotOk = 0;
		}

		public void Init(DashboardComm tmp)
		{
			Trait = tmp.Trait;
			NonTrait = tmp.NonTrait;
			Accept = tmp.Accept;
			Refu = tmp.Refu;
			Lst = tmp.Lst;
		}
	}

}