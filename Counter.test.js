import { render ,screen } from '@testing-library/react';
import Counter from './Counter';

describe ('Counter Component',()=> {
test('render',()=>{
 //Arrange
 render(<Counter />)
const findtext=screen.getAllByText('Redux Auth');
expect(findtext).toBeInTheDocument();
});

});

