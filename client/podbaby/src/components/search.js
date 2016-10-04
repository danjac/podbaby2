import React, { PropTypes } from 'react';



// need to make component, so we can grab ref
const Search = { onSearch, placeholder } => {

  return (
    <form onSubmit={onSearch}>
      <bs.FormGroup>
        <bs.FormControl type="search"
                        ref="search"
                        placeholder={placeholder} />
      </bs.FormGroup>
      <bs.Button className="form-control"
                 type="submit"
                 bsStyle="primary">
        <Icon name="search" />
      </bs.Button>
    </form>
  );
};

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
