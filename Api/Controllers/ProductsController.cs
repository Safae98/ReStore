using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Api.Data;
using Api.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    public class ProductsController : BaseApiController
    {
       
        private readonly StoreContext _context;

        public ProductsController(StoreContext context)
        {
            _context = context;
           
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
           return await _context.Products.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id){
            var product= await _context.Products.FindAsync(id);
            if (product ==null) return NotFound();
            return product ;

        }
    }
}