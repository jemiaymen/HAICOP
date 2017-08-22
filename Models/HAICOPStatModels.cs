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
		public float Montant { get ; set;}
		public float Poucentage { get ; set;}
	}

	public class DashboardComm : TestMonth
	{
		public int Trait { get ; set;}
		public int NonTrait  {get ; set;}
		public int Accept { get ; set;}
		public int Refu {get ; set;}
	}

}