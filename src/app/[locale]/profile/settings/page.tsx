"use client"

import { AvatarUrlEditor } from "./components/AvatarUrlEditor"
import { DeleteAccount } from "./components/DeleteAccount"
import { InfoSection } from "./components/InfoSection"
import { UpdateEmail } from "./components/UpdateEmail"
import { UpdatePassword } from "./components/UpdatePassword"

const SettingsPage = () => {
	return (
		<div className="container max-w-[600px] space-y-7 py-7 px-2">
			<AvatarUrlEditor />
			<InfoSection />
			<UpdateEmail />
			<UpdatePassword />
			<DeleteAccount />
		</div>
	)
}

export default SettingsPage
