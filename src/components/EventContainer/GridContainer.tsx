import styled from "styled-components";

const GridContainerWrapper = styled.div`
    display: flex;
`

const GridColumn = styled.div`
    display: flex;
    flex-direction: column;
`

const GridRow = styled.div`
    display: flex;
`
const GridCell = styled.div`
    width: 50px;
    height: 10px;
    background-color: #FFFFFF;
    border: 1px solid black;
`
const LabelCell = styled.div`
    width: 50px;
    height: 10px;
    background-color: blue;
    border: 1px solid black;
    display: flex;
    justify-content: center;
    align-items: center;
`

type Props = {
    numRows : number;
    numCols : number;
}

const GridContainer = ({numRows, numCols}: Props ) => {
    const gridRows = Array.from({ length : numRows }, (_, rowIndex) => (
        <GridRow key={rowIndex}>
            {Array.from({ length : numCols}, (_, colIndex) => (
                    <GridCell key={colIndex} />
            ))}
        </GridRow>
    ));

    const rowLabels = Array.from({ length: numRows }, (_, rowIndex) => (
        <LabelCell key={rowIndex}>Row{rowIndex +1}</LabelCell>
    ));

    const columnLabels = Array.from({ length: numCols }, (_, ColIndex) => (
        <LabelCell key={ColIndex}>Col {ColIndex +1}</LabelCell>
    ));
    return(
        <GridContainerWrapper>
            <GridColumn>
                <LabelCell></LabelCell>
                {rowLabels}
            </GridColumn>
            <div>
            <GridRow>
                {columnLabels}
            </GridRow>
                {gridRows}
            </div>
        </GridContainerWrapper>
    )
}

export default GridContainer