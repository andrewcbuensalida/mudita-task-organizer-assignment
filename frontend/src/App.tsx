import { useState } from "react";
import {
	Container,
	Box,
	Typography,
	TextField,
	Button,
	Paper,
	CircularProgress,
	List,
	ListItem,
	ListItemText,
	Divider,
	ThemeProvider,
	createTheme,
	CssBaseline,
} from "@mui/material";
import axios from "axios";

const theme = createTheme({
	palette: {
		mode: "light",
		primary: {
			main: "#2196f3",
		},
		secondary: {
			main: "#f50057",
		},
	},
});

interface TaskSchedule {
	time: string;
	task: string;
}

interface ApiResponse {
	schedule: TaskSchedule[];
	explanation: string;
}

function App() {
	const [tasks, setTasks] = useState<string[]>([""]);
	const [loading, setLoading] = useState(false);
	const [schedule, setSchedule] = useState<ApiResponse | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleTaskChange = (index: number, value: string) => {
		const newTasks = [...tasks];
		newTasks[index] = value;
		setTasks(newTasks);
	};

	const addTask = () => {
		setTasks([...tasks, ""]);
	};

	const removeTask = (index: number) => {
		const newTasks = tasks.filter((_, i) => i !== index);
		setTasks(newTasks);
	};

	const handleSubmit = async () => {
		const validTasks = tasks.filter((task) => task.trim() !== "");
		if (validTasks.length === 0) {
			setError("Please add at least one task");
			return;
		}

		setLoading(true);
		setError(null);

		try {
			const response = await axios.post<ApiResponse>(
				"http://localhost:8000/api/plan-tasks",
				{
					tasks: validTasks,
				}
			);
			setSchedule(response.data);
		} catch (err) {
			setError("Failed to plan tasks. Please try again.");
			console.error(err);
		} finally {
			setLoading(false);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			<Container maxWidth="md">
				<Box sx={{ my: 4 }}>
					<Typography
						variant="h3"
						component="h1"
						gutterBottom
						align="center"
					>
						Task Planner
					</Typography>
					<Typography
						variant="subtitle1"
						align="center"
						color="text.secondary"
						paragraph
					>
						Enter your tasks for today and let AI help you plan them
						optimally
					</Typography>

					<Paper elevation={3} sx={{ p: 3, mb: 3 }}>
						<Typography variant="h6" gutterBottom>
							Your Tasks
						</Typography>
						{tasks.map((task, index) => (
							<Box
								key={index}
								sx={{ display: "flex", gap: 1, mb: 2 }}
							>
								<TextField
									fullWidth
									label={`Task ${index + 1}`}
									value={task}
									onChange={(
										e: React.ChangeEvent<HTMLInputElement>
									) =>
										handleTaskChange(index, e.target.value)
									}
									variant="outlined"
								/>
								{tasks.length > 1 && (
									<Button
										variant="outlined"
										color="error"
										onClick={() => removeTask(index)}
										sx={{ minWidth: "100px" }}
									>
										Remove
									</Button>
								)}
							</Box>
						))}
						<Button
							variant="outlined"
							onClick={addTask}
							sx={{ mt: 2 }}
						>
							Add Another Task
						</Button>
					</Paper>

					<Box
						sx={{
							display: "flex",
							justifyContent: "center",
							mb: 3,
						}}
					>
						<Button
							variant="contained"
							size="large"
							onClick={handleSubmit}
							disabled={loading}
							sx={{ minWidth: "200px" }}
						>
							{loading ? (
								<CircularProgress size={24} />
							) : (
								"Plan My Day"
							)}
						</Button>
					</Box>

					{error && (
						<Typography color="error" align="center" paragraph>
							{error}
						</Typography>
					)}

					{schedule && (
						<Paper elevation={3} sx={{ p: 3 }}>
							<Typography variant="h6" gutterBottom>
								Your Optimized Schedule
							</Typography>
							<Typography
								variant="body1"
								paragraph
								color="text.secondary"
							>
								{schedule.explanation}
							</Typography>
							<Divider sx={{ my: 2 }} />
							<List>
								{schedule.schedule.map((item, index) => (
									<ListItem key={index}>
										<ListItemText
											primary={item.task}
											secondary={item.time}
											primaryTypographyProps={{
												variant: "h6",
											}}
										/>
									</ListItem>
								))}
							</List>
						</Paper>
					)}
				</Box>
			</Container>
		</ThemeProvider>
	);
}

export default App;
