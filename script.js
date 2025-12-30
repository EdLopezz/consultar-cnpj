async function teste() {
	const cnpj = document.getElementById('cnpj').value	
	const conteudoResp = document.getElementById('respostas')
	conteudoResp.classList.remove("hidden")
	
	try{
		
		if(cnpj.length < 14 ){
			return conteudoResp.innerHTML = `
			<p><strong>Resposta</strong></p>
			<p style="color: red;">CNPJ inválido</p>`
		}

		conteudoResp.innerHTML = `<p>Consultando...</p>`

		const url = `https://minhareceita.org/${cnpj}`
		const respota = await fetch(url)
		const data =  await respota.json()

		const valorNumerico = parseFloat(data.capital_social);
		const valorFormatado = valorNumerico.toLocaleString('pt-BR', {
		  style: 'currency',
		  currency: 'BRL'
		});
		console.log()
		conteudoResp.innerHTML = `

		<div id="novoResultado">
			<h3><strong>Resultados</strong></h3>
			<p><strong>Nome:</strong> ${data.razao_social}</p>
			<p><strong>CNAE:</strong> ${data.cnae_fiscal}</p>
			<p><strong>Descrição CNAE:</strong> ${data.cnae_fiscal_descricao}</p>
			<p><strong>Inicio da Atividade:</strong> ${data.data_inicio_atividade}</p>
			<p><strong>Data da situação cadastral:</strong> ${data.data_situacao_cadastral}</p>
			<p><strong>Porte:</strong> ${data.porte}</p>
			<p><strong>Capital Social:</strong> ${valorFormatado}</p>
			<p><strong>Natureza Juridica:</strong> ${data.natureza_juridica}</p>
			<p><strong>Situação Cadastral:</strong> ${data.descricao_situacao_cadastral}</p>
			<p><strong>Matriz/Filial:</strong> ${data.descricao_identificador_matriz_filial}</p>
			<p><strong>Endereço:</strong> ${data.descricao_tipo_de_logradouro} ${data.logradouro}, ${data.numero} - ${data.bairro}/${data.municipio}</p>
		</div>
		`
		const novoResp = document.getElementById('novoResultado')
		if (data.qsa.length>1) {
			const lista = data.qsa
			lista.forEach( item => {
				novoResp.insertAdjacentHTML('afterend', `<p><strong>Nome do Sócio:</strong> ${item.nome_socio}</p>`);
			})
				
		}

		const listaCNAES = data.cnaes_secundarios
		listaCNAES.forEach( item => {
				novoResp.insertAdjacentHTML('afterend', `<p><strong>CNAE Secundário:</strong> ${item.codigo}</p>
														 <p><strong>Descrição:</strong> ${item.descricao}</p>`);
		})

	}catch(e){
		conteudoResp.innerHTML = `
		<div>
			<p><strong>Resposta</strong></p>
			<p style="color: red;">Erro: ${e}</p>
		</div>`
	}
}
