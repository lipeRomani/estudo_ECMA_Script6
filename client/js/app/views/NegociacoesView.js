class NegociacoesView extends View {

	template(models) {
		return `
			<table class="table table-hover table-bordered">
		        <thead>
		            <tr>
		                <th onclick="negociacaoController.ordena('data')">DATA</th>
        				<th onclick="negociacaoController.ordena('quantidade')">QUANTIDADE</th>
        				<th onclick="negociacaoController.ordena('valor')">VALOR</th>
        				<th onclick="negociacaoController.ordena('volume')">VOLUME</th>
		            </tr>
		        </thead>

		        <tbody>
		        </tbody>
		        	${models.negociacoes.map(neg => `
		        		<tr>
		        			<td>${DateHelper.dateToText(neg.data)}</td>
		        			<td>${neg.quantidade}</td>
		        			<td>${neg.valor}</td>
		        			<td>${neg.volume}</td>
		        		</tr>
		        	`).join('')}
		        <tfoot>
		        	<td colspan="3" class="text-center text-muted">Total de Volume</td>
		        	<td>${models.getVolumeTotal()}</td>
		        </tfoot>
		    </table>
		`;
	}
}