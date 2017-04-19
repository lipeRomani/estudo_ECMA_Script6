class NegociacoesView extends View {

	template(models) {
		return `
			<table class="table table-hover table-bordered">
		        <thead>
		            <tr>
		                <th>DATA</th>
		                <th>QUANTIDADE</th>
		                <th>VALOR</th>
		                <th>VOLUME</th>
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
		        	<td>${models.negociacoes.reduce((total, neg) => total + neg.volume, 0)}</td>
		        </tfoot>
		    </table>
		`;
	}
}