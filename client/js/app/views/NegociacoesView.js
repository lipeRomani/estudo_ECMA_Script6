class NegociacoesView {
	
	constructor(element) {
		this._element = element;
	}

	_template(models) {
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
		        	${models.map(neg => `
		        		<tr>
		        			<td>${DateHelper.dateToText(neg.data)}</td>
		        			<td>${neg.quantidade}</td>
		        			<td>${neg.valor}</td>
		        			<td>${neg.volume}</td>
		        		</tr>
		        	`).join('')}
		        <tfoot>
		        	<td colspan="3" class="text-center text-muted">Total de Volume</td>
		        	<td>${models.reduce((total, neg) => total + neg.volume, 0)}</td>
		        </tfoot>
		    </table>
		`;
	}

	update(models) {
		let html = this._template(models);
		this._element.innerHTML = html;
	}
}