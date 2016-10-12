
using System.Collections.Generic;


namespace Hyvia.API.Command
{
    public class ShopProductsCommand
    {
        public string ShopName { get; set; }
        public string EmailAddress { get; set; }
        public string Pincode { get; set; }
        public string Address { get; set; }
        public float Latitude { get; set; }
        public float Longitude { get; set; }
        public IList<ProductCommand> Products { get; set; }

    }
}
