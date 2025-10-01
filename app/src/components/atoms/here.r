&::-webkit-scrollbar-track {
		background-color: $neutral-700; // light track
		border-radius: 9999px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: $neutral-700; // dark thumb

		&:hover {
			background-color: $neutral-800;
		}
	}
	// Firefox
	scrollbar-width: thin;
	scrollbar-color: $neutral-200 $neutral-300;

    // Hide default scrollbar
	&::-webkit-scrollbar {
		width: 8px;
	}

	&::-webkit-scrollbar-track {
		background-color: $neutral-200; // light track
		border-radius: 9999px;
	}

	&::-webkit-scrollbar-thumb {
		background-color: $neutral-200; // dark thumb
		border-radius: 9999px;
		transition: background-color 0.3s ease;

		&:hover {
			background-color: $neutral-300;
		}
	}
	// Firefox
	scrollbar-width: thin;
	scrollbar-color: $neutral-200 $neutral-300;