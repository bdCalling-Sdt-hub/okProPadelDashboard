import {
  Input,
  Table,
  Select,
  Modal,
  DatePicker,
  TimePicker,
  Button,
} from "antd";
import React, { useState } from "react";
import { Search } from "lucide-react";
import moment from "moment";
import { useGetAllRequestQuery } from "../redux/features/getAllRequestApi";
import { usePostSetupTrialMatchMutation } from "../redux/features/postSetupTrialMatch";
import { useGetAllVolunteerQuery } from "../redux/features/getAllVolunteer";
import { useGetAllClubQuery } from "../redux/features/getAllClubApi";

const { Option } = Select;

interface UserAction {
  sId: number;
  userId: number;
  image: React.ReactNode;
  name: string;
  email: string;
  status: string;
  dateOfBirth: string;
  contact: string;
}

interface UserData {
  sId: number;
  image: React.ReactNode;
  name: string;
  email: string;
  status: string;
  currentLevel: string;
  requestedLevel: string;
  club: { id: number; club_name: string }[] | undefined;
  action: UserAction;
}

const Request: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [openTrialModal, setOpenTrialModal] = useState<boolean>(false);
  const [trialMatchData, setTrialMatchData] = useState<UserData | null>(null);
  const [selectedClubs, setSelectedClubs] = useState<{ [key: number]: number }>(
    {}
  );
  const [selectedTeam, setSelectedTeam] = useState<number[]>([]);
  const [selectedOpponents, setSelectedOpponents] = useState<number[]>([]);
  console.log("51", selectedOpponents);

  // Fetching data with loading checks
  const { data: requestMatch, isLoading, isError } = useGetAllRequestQuery();
  const { data: volunteers } = useGetAllVolunteerQuery();
  const { data: clubs } = useGetAllClubQuery();
  
  const club = clubs?.data?.clubs || []; // Fallback to empty array if undefined
  const volunteer = volunteers?.data?.volunteers || []; // Fallback to empty array if undefined
  
  const [postSetupTrialMatch] = usePostSetupTrialMatchMutation();

  const pageSize = 10;
console.log("64", requestMatch);
  // Construct dataSource with optional chaining
  const dataSource =
    requestMatch?.data?.map((item, index) => ({
      sId: item.request_id,
      userId: item?.user?.id,
      time: item?.created_at,
      date: item?.created_at,
      name: item?.user?.full_name,
      location: item?.user?.location,
      currentLevel: item?.user?.current_level,
      requestedLevel: item?.request_level,
      club: Array.isArray(item?.club) ? item.club.map(c=> c.id) : [], // Default to empty array if club is undefined,
      status: item?.status,
      action: {
        sId: item.request_id,
        userId: item?.user?.user_id,
        time: item?.created_at,
        date: item?.created_at,
        name: item?.user?.full_name,
        currentLevel: item?.user?.current_level,
        requestedLevel: item?.request_level,
        club: Array.isArray(item?.club) ? item.club.map(c=> c.id) : [], // Default to empty array if club is undefined
        email: `player${index + 1}@example.com`,
        status: item?.status,
        dateOfBirth: "24-05-2024",
        contact: "0521545861520",
      },
    })) || []; // Default to empty array if requestMatch.data is undefined

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Current Level",
      dataIndex: "currentLevel",
      key: "currentLevel",
    },
    {
      title: "Requested Level",
      dataIndex: "requestedLevel",
      key: "requestedLevel",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Trial Matches",
      dataIndex: "trialMatches",
      key: "trialMatches",
      render: (_, record) => (
        <button
          onClick={() => handleTrialMatches(record)}
          className="text-[#00BCE6] px-3"
        >
          Set Up
        </button>
      ),
    },
  ];

  const handlePage = (page: number) => {
    setCurrentPage(page);
  };

  const handleClubChange = (sId: number, value: number) => {
    setSelectedClubs((prev) => ({ ...prev, [sId]: value }));
  };

  const handleTrialMatches = (record: UserData) => {
    setTrialMatchData(record);
    setSelectedTeam([record.sId]);
    if (record.club?.[0]?.id) {
      setSelectedClubs((prev) => ({
        ...prev,
        [record.sId]: record?.club[0].id,
      }));
    }
    setOpenTrialModal(true);
  };
console.log("trialmatch data", trialMatchData);
  const confirmTrialMatch = async () => {
    if (trialMatchData) {
      const id = trialMatchData.sId;
        console.log("146, Selected Opponents before posting:", selectedOpponents); // Debugging step
        const postData = {
            user_id: trialMatchData.userId,
            club_id: selectedClubs[trialMatchData.sId] || trialMatchData.club,
            volunteer_ids: selectedOpponents?.length > 0 ? selectedOpponents : [], // Ensure it's an array
            time: moment().format("HH:mm"),
            date: moment().format("YYYY-MM-DD"),
        };
        
        console.log("Post data being sent:", postData); // Debugging log for post data
        try {
            const result = await postSetupTrialMatch({id, data: postData}).unwrap();
            console.log("Trial match created successfully:", result);
            setOpenTrialModal(false); 
        } catch (error) {
            console.error("Error setting up trial match:", error);
        }
    }
};
  return (
    <div className="py-4">
      <div className="flex justify-between">
        <Input
          prefix={<Search />}
          className="w-[50%] rounded-2xl h-12 bg-base border-0 text-primary placeholder:text-gray-200"
          placeholder="Search for Listing"
          style={{ backgroundColor: "#f0f0f0", color: "#333333" }}
        />
         {/* <Button key="cancel" onClick={ sesTrialMatch}>
              See Trial Match
            </Button> */}
      </div>
      <div className="py-8">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={{
            pageSize,
            total: requestMatch?.data?.length || 0,
            current: currentPage,
            onChange: handlePage,
          }}
          rowKey="sId"
          rowClassName={() => "hover:bg-transparent"}
        />

        {/* Trial Match Modal */}
        <Modal
          title="Setup a Trial Match"
          visible={openTrialModal}
          onCancel={() => setOpenTrialModal(false)}
          footer={[
            <Button key="cancel" onClick={() => setOpenTrialModal(false)}>
              Cancel
            </Button>,
            <Button key="create" type="primary" onClick={confirmTrialMatch}>
              Create Trial Match
            </Button>,
          ]}
        >
          <div>
            <h3>Team</h3>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Select Team"
              defaultValue={selectedTeam}
              onChange={(values) => setSelectedTeam(values)}
            >
              {dataSource.map((player) => (
                <Option key={player.sId} value={player.sId}>
                  {player.name}
                </Option>
              ))}
            </Select>

            <h3>Opponent</h3>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              className="border rounded-md"
              placeholder="Select Opponents"
              onChange={(values) => setSelectedOpponents(values)}
            >
              {volunteer?.map((v) => (
                <Option key={v?.id} value={v?.id}>
                  {v?.name}
                </Option>
              ))}
            </Select>

            <h3>Schedule</h3>
            <TimePicker
              style={{ width: "100%" }}
              defaultValue={moment("12:08", "HH:mm")}
            />
            <DatePicker style={{ width: "100%", marginTop: 10 }} />

            <h3>Club</h3>
            <Select
              style={{ width: '100%' }}
              placeholder="Select Club"
              className="border rounded-md"
              onChange={(value) => handleClubChange(trialMatchData?.sId || 0, value)}
            >
              {club?.map((c) => (
                <Option key={c.id} value={c.id}>
                  {c.club_name}
                </Option>
              ))}
            </Select>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Request;
