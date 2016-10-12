using System.Collections.Generic;

namespace Hyvia.Data.Model
{
    public class SearchData
    {
        public SearchData() {
            SearchValue = new List<string>();
        }
        public string SearchField { get; set; }
        public IList<string> SearchValue { get; set; }
    }
}
