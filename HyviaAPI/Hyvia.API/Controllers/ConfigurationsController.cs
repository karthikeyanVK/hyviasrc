﻿using System.Collections.Generic;
using System.Web.Http;

namespace Hyvia.API.Controllers
{
    public class ConfigurationsController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

         
        [HttpPost]
        [Route("update/shopcategory")]
        public void UpdateShopCategory([FromBody]string value)
        {

        }

       
        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}