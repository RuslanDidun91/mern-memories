import React, { useState } from 'react';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { Container, Grow, Grid, Paper, TextField, Button, AppBar } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getPostsBySearch } from '../../actions/posts';
import { useNavigate, useLocation } from 'react-router-dom';
import ChipInput from 'material-ui-chip-input';
import Pagination from '../Pagination';
import useStyles from './styles';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  //tracking posts id
  const [currentId, setCurrentId] = useState(null);
  //traacking search value
  const [search, setSearch] = useState('');
  //tracking tags value
  const [tags, setTags] = useState([]);

  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const navigate = useNavigate();
  const page = query.get('page') || 1;
  const searchQuery = query.get('search') || '';

  const searchPosts = () => {
    if (search.trim() || tags) {
      dispatch(getPostsBySearch({ search, tags: tags.join(',') }));
      navigate(`/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`);
    } else {
      navigate('/');
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 'Enter') {
      searchPosts();
    }
  }

  const handleAddChip = (tag) => setTags([...tags, tag]);
  const handleDeleteChip = (chipToDelete) => setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    // animation Grow in
    <Grow in>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between"
          alignItems="stretch" spacing={3} className={classes.gridContainer}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                onKeyDown={handleKeyPress}
                name="search" variant="outlined"
                label="Search Memories" fullWidth
                value={search} onChange={(e) => setSearch(e.target.value)} />
              <ChipInput
                style={{ margin: '10px 0' }} value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags" variant="outlined" />
              <Button
                onClick={searchPosts} className={classes.searchButton}
                variant="contained" color="primary">Search</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
              <Paper className={classes.pagination} elevation={5}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;