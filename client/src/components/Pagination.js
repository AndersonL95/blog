import { Link } from 'react-router-dom';
import { BsChevronRight, BsChevronLeft } from 'react-icons/bs';
const Pagination = ({ count, page, perPage }) => {
	let totalPages = Math.ceil(count / perPage);
	let startLoop = page;
	let diff = totalPages - page;
	if (diff <= 3) {
		startLoop = totalPages - 3;
	}
	let endLoop = startLoop + 3;
	if (startLoop <= 0) {
		startLoop = 1;
	}
	const links = () => {
		const store = [];
		for (let i = startLoop; i <= endLoop; i++) {
			store.push(
				<li key={i} className={i == page ? 'active' : ''}>
					<Link to={`/dashboard/${i}`}>{i}</Link>
				</li>
			);
		}
		return store;
	};
	const next = () => {
		if (page < totalPages) {
			return (
				<li>
					<Link to={`/dashboard/${parseInt(page) + 1}`}>
						<BsChevronRight />
					</Link>
				</li>
			);
		}
	};
	const prev = () => {
		if (page > 1) {
			return (
				<li>
					<Link to={`/dashboard/${parseInt(page - 1)}`}>
						<BsChevronLeft />
					</Link>
				</li>
			);
		}
	};

	return totalPages ? (
		<div className='pagination'>
			{prev()}
			{links()}
			{next()}
		</div>
	) : (
		''
	);
};
export default Pagination;