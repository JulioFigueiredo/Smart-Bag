using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;

namespace SmartBag.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ObjetoStatusController : ControllerBase
    {
        // Lista estática para armazenar os objetos e seus status
        private static List<ObjetoStatus> objetosStatus = new List<ObjetoStatus>();

        // POST api/status
        [HttpPost]
        public IActionResult ReceberStatus([FromBody] ObjetoStatus objetoStatus)
        {
            if (objetoStatus == null)
            {
                return BadRequest("Dados inválidos");
            }

            // Verifica se o objeto já existe na lista
            var objetoExistente = objetosStatus.FirstOrDefault(o => o.Objeto == objetoStatus.Objeto);
            if (objetoExistente != null)
            {
                // Atualiza o status do objeto
                objetoExistente.Status = objetoStatus.Status;
            }
            else
            {
                // Adiciona o novo objeto à lista
                objetosStatus.Add(objetoStatus);
            }

            Console.WriteLine($"Objeto: {objetoStatus.Objeto}, Status: {(objetoStatus.Status ? "Dentro da mochila" : "Fora da mochila")}");

            if (objetoStatus.Status == false)
            {
                Console.WriteLine("Não Esqueça o objeto!");
            }

            // Retorna uma resposta de sucesso
            return Ok(new { mensagem = "Status recebido com sucesso!" });
        }

        // GET api/status
        [HttpGet]
        public IActionResult GetStatus()
        {
            // Retorna a lista de objetos e seus status
            return Ok(objetosStatus);
        }
    }
    
}
